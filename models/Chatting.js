const mongoose = require("mongoose");


const ChattingSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Chatting", ChattingSchema);
