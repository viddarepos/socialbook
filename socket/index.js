const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

//brisem usera iz socketa
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

//dodajem usera u socket
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && //proveravam da li je u users isti user i ako niej
        users.push({ userId, socketId });
};

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => { //on je metoda kad se uzima nesto sa klijenta
        addUser(userId, socket.id);
        io.emit("getUsers", users); //da se posalje sa servera na klijent 
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        //trazim user da posaljem poruku i pisem gore fuknciju
        const user = getUser(receiverId);
        //saljem poruku useru
        io.to(user.socketId).emit("getMessage", { //koristim to pa onda emit jer trazim specificnog usera tj samo jednog
            senderId, text,
        });

    })



    //when disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});

