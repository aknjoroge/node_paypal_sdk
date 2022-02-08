const express = require("express");
let bookingRoutes = require("./Routes/bookingRoute");
let port = 2500;

const app = express();
app.use(express.json());
// To receive Form Data we use urlencoded
app.use(express.urlencoded({ limit: "10kb", extended: true }));
//font end view
app.use(express.static(`${__dirname}/public`));

app.use("/api", bookingRoutes);

app.listen(port, function () {
  console.log(`Paypal SDK running on : http://localhost:${port}/`);
});
