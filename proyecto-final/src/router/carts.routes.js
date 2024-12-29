import { Router } from "express";


import { cartModel } from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";
import { productDao } from "../dao/mongoDao/products.dao.js";
import { cartDao } from "../dao/mongoDao/carts.dao.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await cartModel.create({});

    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const findProduct = await productModel.findById(pid);
    if (!findProduct) return res.json({ status: "error", message: `Product id ${pid} not found` });

    const findCart = await cartModel.findById(cid);
    if (!findCart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    const product = findCart.products.find((productCart) => productCart.product === pid);
    if (!product) {
      findCart.products.push({ product: pid, quantity: 1 });
    } else {
      product.quantity++;
    }


    const cart = await cartModel.findByIdAndUpdate(cid, { products: findCart.products }, { new: true });

    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const {cid, pid} = req.params;
  try {
    const product = await productDao.getById(pid)
    if (!product) return res.json({ status: "error", message: `Product id ${pid} not found` });

    const cart = await cartDao.getById(cid);
    if (!cart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    const cartUpdated = await cartDao.deleteProduct(cid, pid);

    res.json({ status: "ok", payload: cartUpdated });
    
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
})

router.put("/:cid/products/:pid", async (req, res) => {
  const {cid, pid} = req.params;
  const {quantity} = req.body;
  try {
    const product = await productDao.getById(pid)
    if (!product) return res.json({ status: "error", message: `Product id ${pid} not found` });

    const cart = await cartDao.getById(cid);
    if (!cart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    const cartUpdated = await cartDao.updateProducts(cid, pid, quantity);

    res.json({ status: "ok", payload: cartUpdated });

  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
})

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    const cartUpdated = await cartDao.deleteProducts(cid);

    res.json({ status: "ok", payload: cartUpdated });

  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
})

export default router;