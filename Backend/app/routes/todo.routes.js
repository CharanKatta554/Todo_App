const todos = require("../controllers/todo.controller.js");
const router = require("express").Router();
router.post("/todo",todos.create);
router.get("/todo",todos.findAll);
router.get("/todo/:title",todos.findTodo);
router.delete("/todo/:id",todos.deleteTodo);


module.exports = router;