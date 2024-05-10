import { Router } from "express";
import { ToDo } from "../db.js"
const router = Router()

router.delete("/:id" , async (req , res) => {
    try{
        const {id} = req.params;
        await ToDo.findByIdAndDelete(id)
        res.send("Delete Successfully")
    }
    catch{
        console.log(err);
        res.status(500).send("Server error")
    }

    
})

export default router;

