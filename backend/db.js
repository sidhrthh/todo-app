import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Mongo Connected")
})
.catch((err) => {
    console.log(err);
})

const todoSchema = new mongoose.Schema({
    type:String,
    require : true
})

const ToDo = mongoose.model("ToDo" , todoSchema )

module.exports = ToDo ;