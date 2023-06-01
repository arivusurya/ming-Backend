const User = require("./User.model");
const Product = require("./Product.model");
const Model = {};
Model.user = User;
Model.product = Product;

module.exports = Model;
