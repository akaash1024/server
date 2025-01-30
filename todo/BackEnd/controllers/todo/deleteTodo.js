const TodoModel = require("../../models/todo.model");

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndDelete(id);
    res.status(203).json({ msg: "Todo deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = deleteTodo;
