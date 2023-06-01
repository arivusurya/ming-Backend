const Model = require("../model");

const Productcontroller = {};

Productcontroller.getProductbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Model.product.findOne({
      where: { productId: id },
      include: Model.category,
    });
    res.status(200).json({ product: Product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

Productcontroller.createProduct = async (req, res) => {
  const { name, category } = req.body;
  try {
    const cat = await Model.category.findOrCreate({
      where: { name: category },
    });
    const product = await Model.product.create({
      name: name,
      categoryid: cat[0].categoryid,
    });
    res.send(product);
  } catch (error) {}
};

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
module.exports = Productcontroller;
