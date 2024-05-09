import express from 'express';
import cors from "cors"
import mainRouter from "./router/todoRouters.js"

const app = express()
const PORT = 3000 ;

//Middlewares
app.use(express.json())
app.use(cors())

app.use("/api/v1" , mainRouter)

app.listen(PORT , ()=> {
    console.log(`Server is running in the ${PORT}`)
})