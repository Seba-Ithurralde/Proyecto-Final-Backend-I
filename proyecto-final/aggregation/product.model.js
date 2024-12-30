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
  quantity: Number,
  category: String,
  date: Date,
});

export const productModel = mongoose.model(productCollection, productSchema);
