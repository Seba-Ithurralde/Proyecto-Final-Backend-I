import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("mongodb+srv://admin:123@cluster70395.hei9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster70395");
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
  }
}