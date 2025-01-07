import mongoose from "mongoose";

const orderCollection = "orders";

const orderSchema = new mongoose.Schema({
  name: String,
  size: {
    type: String,
    enum: ["Computación", "Periférico", "Kits de Computación"],
    default: "Computación",
  },
  price: Number,
  stock: Number
});

export const orderModel = mongoose.model(orderCollection, orderSchema);
