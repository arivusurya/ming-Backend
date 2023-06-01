const express = require("express");
const sequelize = require("./version/v1/config/db.config");
const Model = require("./version/v1/model");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

app.use("/api", require("./version/v1/routes/User.routes"));
app.use("/api", require("./version/v1/routes/Product.routes"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, async () => {
  await sequelize.authenticate();
  await Model.user.sync();
  await Model.category.sync();
  await Model.product.sync();

  console.log(`Server is running on port ${port}`);
});
