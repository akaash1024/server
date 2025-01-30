const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    complete: { type: Boolean, default: false },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
