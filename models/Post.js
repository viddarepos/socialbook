const mongoose = require("mongoose");



const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true

        },
        desc: {
            type: String,
            max: 500
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
    },

    { timestamps: true } /* timestamps:true -> kada se kreira user ili izvrsi update izvrice se apdjetiranje timestampsa
    Mongoose schema podrzava timestamps opciju. Ako se timestamps stavi na true, Mongoose ce dodati dva nova propertija tipa Date na schemi "createdAt:" -> datum predstavlja kada se ovaj dokument kreirao
     i "updatedAt:" -> datum predstavlja kada se je ovaj dokument zadnji put apdejtovao*/
)

module.exports = mongoose.model("Post", PostSchema);
