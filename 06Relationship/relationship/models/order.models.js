const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalprice: { type: Number, required: true },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.pre("validate", function (next) {
  this.totalprice = this.products.reduce((total, product) => {
    return total + product.price * product.qty;
  }, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
