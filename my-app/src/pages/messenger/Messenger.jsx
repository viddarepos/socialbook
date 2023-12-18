import React from "react";
import Chatting from "../../components/chatting/Chatting";
import OnlineFriends from "../../components/onlineFriends/OnlineFriends";
import Message from "../../components/message/Message";
import Navbar from "../../components/navbar/Navbar";
import "./messenger.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Aos from "aos";
import { axiosInstace } from "../../config";
const Messenger = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState("")
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        Aos.init({ duration: 1000 });
    })


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                //ove vrednosti su iz mongoa
                sender: data.senderId,
                text: data.text,
                createAt: Date.now() //trenutni datum
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && //ako je arrivalMessage
            setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]) //kada je arrivalMessage i chat promenjen onda se desi effect

    useEffect(() => {
        //saljem serveru
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => { //uzimamo sa servera
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axiosInstace.get("/chattings/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axiosInstace.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id, //current user
            text: newMessage,
            conversationId: currentChat._id

        }
        //saljem poruku i fecujem iz socketa s metodom emit jer emit sluzi za slanje
        const receiverId = currentChat.members.find(member => member !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axiosInstace.post("/messages", message) // , message znaci sending
            setMessages([...messages, res.data])
        } catch (err) {
            console.log(err);
        }
        setNewMessage("")
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" }) //metoda koja skroluje na kraju diva i behavior se stavlja na smooth
    }, [messages])//kada se poruka promeni iskoristi se useeffect

    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper" data-aos="fade-right">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Chatting key={c.id} conversation={c} currentUser={user} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="chatBox" >
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop" data-aos="fade-up">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper" data-aos="fade">
                        <OnlineFriends onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>

    )

}


export default Messenger;