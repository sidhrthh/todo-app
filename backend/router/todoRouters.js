import express from "express";
import getTodos from "./getTodos.js";
import postTodo from "./postTodo.js";
import updateTodo from "./updateTodo.js";
import dltTodo from "./dltTodo.js";

const router = express.Router();

router.use("/", getTodos);
router.use("/add", postTodo);
router.use("/update", updateTodo);
router.use("/delete", dltTodo);

export default router;
