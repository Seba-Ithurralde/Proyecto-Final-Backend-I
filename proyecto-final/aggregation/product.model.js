import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  thumbnail: String,
  code: String,
  title: String,
  price: Number,
  stock: Number,
  category: {
    type: String,
    enum: ["Computación", "Periférico", "Kits de Computación"],
    default: "Periférico"
  }
});

export const productModel = mongoose.model(productCollection, productSchema);
