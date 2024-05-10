import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Mongo Connected")
})
.catch((err) => {
    console.log(err);
})

const toDoSchema = new mongoose.Schema({
    toDo: String
});



const ToDo = mongoose.model("todo" , toDoSchema  )

export { ToDo };
