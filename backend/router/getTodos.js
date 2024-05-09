import { Router } from "express";
const router = Router()

router.get("/" , async (req , res) => {
    res.send("hi")
})

export default router;

