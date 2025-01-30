const createTodo = require("../controllers/todo/createTodo");
const deleteTodo = require("../controllers/todo/deleteTodo");
const getTodos = require("../controllers/todo/getTodos");
const updateTodo = require("../controllers/todo/updateTodo");
const auth = require("../middlewares/auth.middleware");
const verifyUser = require("../middlewares/verifyUser.middleware");

const todoRoutes = require("express").Router();

todoRoutes.get("/", auth, getTodos);
todoRoutes.post("/create", auth, createTodo);
todoRoutes.patch("/update/:id", auth, verifyUser, updateTodo);
todoRoutes.delete("/delete/:id", auth, verifyUser, deleteTodo);

module.exports = todoRoutes;
