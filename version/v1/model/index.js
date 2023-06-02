const User = require("./User.model");
const Product = require("./Product.model");
const Category = require("./Category.model");
const Review = require("./Review.model");
const Model = {};
Model.user = User;
Model.product = Product;
Model.category = Category;
Model.review = Review;

module.exports = Model;
