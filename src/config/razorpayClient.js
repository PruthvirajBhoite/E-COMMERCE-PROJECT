const Razorpay = require('razorpay');
require("dotenv").config();

const apiKey = rzp_test_SbjgbF2iilVoHw;
const apiSecret =I64AQUMYhB7rKmw5jI6HDVW6;

var razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;