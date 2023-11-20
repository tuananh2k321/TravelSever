var express = require("express");
var router = express.Router();
const tokenController = require("../../component/token-notification/TokenService");

//http://localhost:3000/tokenNotification/api/addToken?token=""
router.get("/addToken", async (req, res, next) => {
  try {
    const { token } = req.query;

    const newToken = await tokenController.addToken(token);
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

module.exports = router;
