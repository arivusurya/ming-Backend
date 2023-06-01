const User = require("./User.model");
const Product = require("./Product.model");
const Category = require("./Category.model");
const Model = {};
Model.user = User;
Model.product = Product;
Model.category = Category;

module.exports = Model;
