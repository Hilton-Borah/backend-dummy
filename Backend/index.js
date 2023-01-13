const express = require("express");
const { connect } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
const { noteRoute } = require("./Rotes/note.routes");
const { useRoute } = require("./Rotes/user.routes");

require("dotenv").config();


const app = express();
app.use(express.json())

app.use("/user",useRoute)
app.use(authentication)
app.use("/note",noteRoute)

// app.get("/data",(req,res)=>{
//     const token = req.query.token;

//     jwt.verify(token, 'hilton', (err,decoded)=>{
//         if (err){
//             res.send("Please login again,Invalid token")
//         } else {
//             res.send("Data ....")
//         }
//     });
// })

// app.get("/cart",(req,res)=>{
//     const token = req.query.token;

//     jwt.verify(token, 'hilton', (err,decoded)=>{
//         if (err){
//             res.send("Please login again,Invalid token")
//         } else {
//             res.send("Cart ....")
//         }
//     });
// })

app.listen(process.env.port,async()=>{
    try{
        await connect
        console.log("connection established")
    }catch(err){
        console.log(err)
    }
    console.log("server connected")
})