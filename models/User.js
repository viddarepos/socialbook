const mongoose = require("mongoose");




const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: "" //kada se kreira user 

    },
    coverPicture: {
        type: String,
        default: "" //kada se kreira user 

    },
    followers: {
        type: Array, //cuvacemo usere u nizu
        default: [] //kada se kreira user
    },
    followings: {
        type: Array, //cuvacemo usere u nizu
        default: [] //kada se kreira user
    },
    isAdmin: {
        type: Boolean,
        default: false //kada se kreira user
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3] //moze biti u vezi i ne mora, moze biti ozenjen
    }
},
    { timestamps: true } /* timestamps:true -> kada se kreira user ili izvrsi update izvrice se apdjetiranje timestampsa
    Mongoose schema podrzava timestamps opciju. Ako se timestamps stavi na true, Mongoose ce dodati dva nova propertija tipa Date na schemi "createdAt:" -> datum predstavlja kada se ovaj dokument kreirao
     i "updatedAt:" -> datum predstavlja kada se je ovaj dokument zadnji put apdejtovao*/
)

module.exports = mongoose.model("newUser", UserSchema);
