var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51OAMNGANZv3Twwu9rEXzQetkmIAcG41lDeiQlhumcjDjfbwrzW0ggqiOTbSYENXILEYIrN9hwnCOTWDvEXD9X1pE00KKauC5TV');
// http://localhost:3000/payments/intents
router.post('/intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });
module.exports = router;