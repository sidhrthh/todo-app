import { Router } from "express";
import { ToDo } from "../db.js"
const router = Router()

router.post("/", async (req, res) => {
    try {
        const { toDo } = req.body;
        const todoCreate = await ToDo.create({ toDo });
        res.status(201).json({ message: "Todo created successfully", todo: todoCreate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create todo" });
    }
});


export default router;

