const TodoModel = require("../../models/todo.model");

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndUpdate(id, req.body);
    res.status(201).json({ msg: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = updateTodo;
