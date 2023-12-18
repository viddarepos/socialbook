const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const chattingRoute = require("./routes/chatting");
const messagesRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path") //nije preporucljivo da cuvas slike u serveru kao sto sam uradio u ovom projektu vec da koristis firebase ili nesto slicno

/* metoda config omogucava koriscenje biblioteke dotenv*/
dotenv.config();

/*kreiranje konekcije na mongo db baze */
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB")
});

app.use("/images", express.static(path.join(__dirname, "public/images"))) //ako kortistis images path ne pravi request nego idi u ovaj direktorijum 


//middleware (softver koji pavi konekciju izmedju operativn sistema i aplikacije)
app.use(express.json()); // -> body parser (kad pravis request samo ce da ga parsuje)
app.use(helmet());
app.use(morgan("common")) //-> ima mnogo vise opcija za morgan ali cu ja koristi samo opciju common (proveri morgan dokumentaciju)


//FILE UPLOADER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);//saljem u react app sa req.body.name
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});
/*

app.get("/", (req, res) => {
    res.send("home page");
//::1 - - [03/Jun/2022:23:37:03 +0000] "GET / HTTP/1.1" 200 9 -> ovo radi morgan
}) */

/* moja adresa za rest api -> kada pogodimo ovu adresu /api/users pokrenuce se userRoute tj route*/
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/chattings", chattingRoute);
app.use("/api/messages", messagesRoute);


app.use(express.static(path.join(__dirname, "/client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
})

/* app.listen sluzi da pokrenemo aplikaciju odnsno nacin na koji cemo da koristimo app i dodeljujemo specificni port*/
app.listen(procces.env.PORT || 8800, () => {
    console.log("Backend server is running");
})