import { Router } from "express";
import { ToDo } from "../db.js"
const router = Router()

router.get("" , async (req , res) => {
    const toDos = await ToDo.find()
    res.send(toDos)
})

export default router;

