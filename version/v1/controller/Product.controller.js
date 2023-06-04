const multer = require("multer");
const Model = require("../model");

const Productcontroller = {};

// product by id
Productcontroller.getProductbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Model.product.findOne({
      where: { productId: id },
      include: Model.category,
    });
    const review = await Model.review.findAll({
      where: { productId: id },
      include: [
        {
          model: Model.user,
          attributes: { exclude: ["password"] }, // Exclude the password field from the user model
        },
      ],
    });

    res.status(200).json({ product: Product, review: review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create a new Product

Productcontroller.createProduct = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const name = data.name;
  const category = data.category;

  const filename = req.file.filename;
  const basepath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  try {
    const cat = await Model.category.findOrCreate({
      where: { name: category },
    });
    const product = await Model.product.create({
      name: name,
      categoryid: cat[0].categoryid,
      image: `${basepath}${filename}`,
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// product By Category
Productcontroller.getbyCategory = async (req, res) => {
  const query = req.query;

  try {
    const category = await Model.category.findOne({
      where: { name: query.name },
    });
    if (!category) {
      return res.status(404).json({ message: "No product found" });
    }
    const product = await Model.product.findAndCountAll({
      where: { categoryid: category.dataValues.categoryid },
      include: Model.category,
    });
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ message: "Internel server error" });
  }
};

// get all products

Productcontroller.getAllproduct = async (req, res) => {
  try {
    const Products = await Model.product.findAll({ include: Model.category });
    res.status(200).json({ product: Products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error" });
  }
};
module.exports = Productcontroller;
