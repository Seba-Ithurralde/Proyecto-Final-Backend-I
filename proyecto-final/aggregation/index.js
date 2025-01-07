import mongoose from "mongoose";
import { orderModel } from "./order.model.js";

const environment = async () => {
 
  await mongoose.connect("mongodb+srv://admin:123@cluster70395.hei9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster70395");


  const orders = await orderModel.aggregate([
    {
      $match: { size: "Computación" }
    },
    {
      $group: {_id: "$name", totalQuantity: { $sum: "$stock" }}
    },
    {
      $sort: { totalQuantity: -1 }
    },
    {
      $group: {_id: 1, orders:{$push: "$$ROOT"}}
    },
    {
      $project: {
        "_id": 0,
        orders: "$orders"
      }
    },
    {
      $merge: {
        into: "reports"
      }
    }
  ])

  console.log(orders);
};

environment();
