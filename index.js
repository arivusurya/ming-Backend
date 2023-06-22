require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"));
app.use(morgan("dev"));

app.use("/api/v1", require("./version/v1/router"));

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
