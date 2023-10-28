var express = require("express");
var router = express.Router();
const cartController = require("../../component/cart/CartController");

router.post("/addCart", async (req, res) => {
  try {
    const { name, number, cvv, user_id } = req.body;
    await cartController.addCart(name, number, cvv, user_id);
    res.status(200).json({ result: true, message: "Add cart Success" });
  } catch (error) {
    return res
      .status(400)
      .json({ result: false, error: error, message: "Add cart Failed" });
  }
});

router.get("/getListCart", async (req, res, next) => {
  try {
    const {userID} = req.query;
    const cart = await cartController.getListCart(userID);
    console.log(cart);
    res
      .status(200)
      .json({ result: true, cart: cart, message: "Get cart Success" });
  } catch (error) {
    res.status(400).json({ result: false, error, message: "Get cart fail" });
  }
});

router.delete("/deleteCart/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await cartController.deleteCartbyID(id);
    return res
      .status(200)
      .json({ result: true, message: "Delete cart Success" });
  } catch (error) {
    return res.status(400).json({ result: true, message: "Dekete cart fail" });
  }
});

module.exports = router;
