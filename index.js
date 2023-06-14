const express = require("express");
const sequelize = require("./version/v1/config/db.config");
const Model = require("./version/v1/model");
const cors = require("cors");
const Order = require("./version/v1/model/Order.model");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(
  "/version/v1/public/uploads",
  express.static(__dirname + "/version/v1/public/uploads")
);
app.use(cors());

app.use("/api", require("./version/v1/routes/User.routes"));
app.use("/api", require("./version/v1/routes/Product.routes"));
app.use("/api/product", require("./version/v1/routes/Review.routes"));
app.use("/api/cart", require("./version/v1/routes/Cart.routes"));
app.use("/api/order", require("./version/v1/routes/Order.routes"));
app.use("/api/pay", require("./version/v1/routes/Payment.routes"));
// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
