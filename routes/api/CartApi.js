var express = require("express");
var router = express.Router();
const cartController = require("../../component/cart/CartController");

router.post("/addCart", async (req, res) => {
  try {
    const { name, totalPrice, content, user_id } = req.body;
    await cartController.addCart(name, totalPrice, content, user_id);
    res.status(200).json({ result: true, message: "Add cart Success" });
  } catch (error) {
    return res
      .status(400)
      .json({ result: false, error: error, message: "Add cart Failed" });
  }
});

router.get("/getListCart", async (req, res, next) => {
  try {
    const cart = await cartController.getListCart();
    console.log(cart);
    res
      .status(200)
      .json({ result: true, booking: cart, message: "Get cart Success" });
  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get cart fail" });
  }
});

module.exports = router;
