const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "AeuKv1bLzSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  client_secret: "EO3x8vGxyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

exports.paypalObject = async function (req, res, next) {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:2500/api/process",
      cancel_url: "http://localhost:2500/api/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: req.body.itemname,
              sku: "001",
              price: req.body.price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: req.body.price,
        },
        description: "Dummy description ",
      },
    ],
  };

  req.create_payment_json = create_payment_json;
  next();
};

exports.paypalSession = async function (req, res, next) {
  try {
    paypal.payment.create(req.create_payment_json, function (error, payment) {
      if (error) {
        console.log(error);
      } else {
        console.log(payment);

        //searching for Approval Url
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    console.log("Catch error", error);
    res.send("Catch error");
  }
};

exports.paypalProcess = async function (req, res, next) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  //req.create_payment_json.transactions[0].item_list.items[0].price,
  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
      } else {
        // console.log(JSON.stringify(payment));
        console.log(payment);
        res.send("Success");
      }
    }
  );
};
