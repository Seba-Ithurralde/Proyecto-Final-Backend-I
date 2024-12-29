import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("mongodb+srv://admin:123@cluster70395.glb9w.mongodb.net/proyectofinal");
  } catch (error) {
    console.log(error);
  }
}