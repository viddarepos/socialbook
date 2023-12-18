const router = require("express").Router();
const Chatting = require("../models/Chatting");

//new conversation

router.post("/", async (req, res) => {
    const newConversation = new Chatting({
        members: [req.body.senderId, req.body.receiverId] //req.bodysenderId i reciever, to su vrednosti u postman body  iz senderId i recieverId propertija tako ih uzima
    })
    //dodajem u mongoDb
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err); // 500 predstavlja gresku u bazu
    }
})

//get conv of a user
//uzimam razogovor pomocu id-a usera

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Chatting.find({
            members: { $in: [req.params.userId] }, //za svaki razogvor proverava members za dati id i uz pomoc tog id-a naci ce drugi id tj druog usera koji se nalazi u istom nizu 
        })
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }

})

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Chatting.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;