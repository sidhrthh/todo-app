import { Router } from "express";
import { ToDo } from "../db.js"
const router = Router()

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { toDo } = req.body;
        await ToDo.findByIdAndUpdate(id, { toDo });
        res.send("Update successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


export default router;

