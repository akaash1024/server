const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
  }
);

// Automatically calculate totalprice before saving the order
orderSchema.pre("save", function (next) {
  this.totalprice = this.products.reduce((total, product) => {
    return total + product.price * product.qty;
  }, 0);
  next();
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = { OrderModel };
