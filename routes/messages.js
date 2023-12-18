const router = require("express").Router();
const Message = require("../models/Message");



//add

router.post("/", async (req, res) => {
    const newMessage = await Message(req.body); //stavi u newmessage sve iz body u postmenu
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err)
    }
})



//get

//nadji sve poruke ciji je conversationId ovaj u url
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }

})


module.exports = router;