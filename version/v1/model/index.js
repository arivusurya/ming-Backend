const User = require("./User.model");
const Product = require("./Product.model");
const ProductDescription = require("./ProductDescription.model");
const Category = require("./Category.model");
const Review = require("./Review.model");
const Order = require("./Order.model");
const Cart = require("./Cart.model");
const Model = {};
Model.user = User;
Model.product = Product;
Model.productdescription = ProductDescription;
Model.category = Category;
Model.review = Review;
Model.order = Order;
Model.cart = Cart;

module.exports = Model;
