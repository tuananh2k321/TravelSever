var express = require("express");
var router = express.Router();
const tokenController = require("../../component/token-notification/TokenService");

//http://localhost:3000/tokenNotification/api/addToken?token=""&userId=""
router.get("/addToken", async (req, res, next) => {
  try {
    const { token, userId } = req.query;

    const newToken = await tokenController.addToken(token, userId);
    if (newToken) {
      return res
        .status(200)
        .json({ result: true, token: newToken, message: "Success" });
    }
    return res
      .status(200)
      .json({ result: false, token: null, message: "Fail" });
  } catch (error) {
    return res.status(500).json({ result: false, token: null });
  }
});

//http://localhost:3000/tokenNotification/api/listToken
router.get("/listToken", async (req, res, next) => {
  try {
    const tokens = await tokenController.getToken();
    console.log(tokens);
    const tokensArray = tokens.map((tokenObj) => tokenObj.token);
    if (tokensArray) {
      return res
        .status(200)
        .json({ result: true, tokens: tokensArray, message: "Success" });
    } else {
      return res
        .status(200)
        .json({ result: false, tokens: null, message: "Fail" });
    }
  } catch (error) {
    console.log("listToken:" + error);
  }
});

//http://localhost:3000/tokenNotification/api/tokenOfUser?userId=""
router.get("/tokenOfUser", async (req, res, next) => {
  try {
    const {userId} = req.query
    const token = await tokenController.getTokenByUserId(userId);
    console.log(token);
    if (token) {
      return res
        .status(200)
        .json({ result: true, token: token, message: "Success" });
    } else {
      return res
        .status(200)
        .json({ result: false, token: null, message: "Fail" });
    }
  } catch (error) {
    console.log("listToken:" + error);
  }
});

module.exports = router;
