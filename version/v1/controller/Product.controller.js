const Model = require("../model");
const { logger } = require("../logger/logger");

const Productcontroller = {};

// product by id
Productcontroller.getProductbyId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const Product = await Model.product.findOne({
      where: { productId: id },
      include: [
        {
          model: Model.category,
        },
        {
          model: Model.productdescription,
        },
      ],
    });

    const review = await Model.review.findAll({ where: { productId: id } });

    res.status(200).json({ product: Product, review: review });
  } catch (error) {
    logger.error(error);
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create a new Product
Productcontroller.createProduct = async (req, res) => {
  const { name, category, description, price } = req.body;

  try {
    const cat = await Model.category.findOrCreate({
      where: { name: category },
    });

    const product = await Model.product.create({
      name: name,
      categoryid: cat[0].categoryid,
      price: price,
    });

    const productDescription = await Model.productdescription.create({
      productId: product.productId,
      description: description,
    });

    res.send({ product, productDescription });
  } catch (error) {
    logger.error(error);
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
    logger.error(error);
    console.log(error);
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
    logger.error(error);
    res.status(500).json({ message: "Internel server error" });
  }
};
module.exports = Productcontroller;
