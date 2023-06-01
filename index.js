const express = require("express");
const sequelize = require("./config/db.config");
const Model = require("./model");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

app.use("/api", require("./routes/User.routes"));
app.use("/api", require("./routes/Product.routes"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, async () => {
  await sequelize.authenticate();
  await Model.user.sync();
  await Model.product.sync();
  console.log(`Server is running on port ${port}`);
});
