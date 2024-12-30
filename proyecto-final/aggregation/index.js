import mongoose from "mongoose";
import { productModel } from "./product.model.js";

const environment = async () => {
 
  await mongoose.connect("mongodb+srv://admin:123@cluster70395.glb9w.mongodb.net/proyecto-final");

  const products = await productModel.aggregate([
    {
      $match: { category: "Periférico" }
    },
    {
      $group: {_id: "$name", totalQuantity: { $sum: "$quantity" }}
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

  console.log(products);
};

environment();
