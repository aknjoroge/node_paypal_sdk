let express = require("express");
let bookingController = require("../controllers/bookingcontroller");

let routes = express.Router();

routes.post(
  "/session",
  //First we create a payment Object
  bookingController.paypalObject,
  //Then we create a payment Session
  bookingController.paypalSession
);
// process Payment Process
routes.get("/process", bookingController.paypalProcess);

//cancelling the payment
routes.get("/cancel", function (req, res, next) {
  res.send("Transaction was cancelled");
});

module.exports = routes;
