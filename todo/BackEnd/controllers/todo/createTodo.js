const TodoModel = require("../../models/todo.model");

const createTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    return res.status(201).json({ msg: "Todo has been saved", newTodo });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = createTodo;
