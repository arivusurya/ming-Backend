const Model = require("../model");

const Cartcontroller = {};

// Add one product to Cart

Cartcontroller.addToCart = async (req, res) => {
  const userid = req.User.userid;
  const productId = req.body.productId;
  const quantity = req.body.quantity || 1;

  try {
    const existingCartRow = await Model.cart.findOne({
      where: {
        userid: userid,
        productId: productId,
      },
    });

    if (existingCartRow) {
      const newCartRow = await existingCartRow.increment("quantity", {
        by: quantity,
      });
      newCartRow.quantity += Number(quantity);
      res.send(newCartRow);
    } else {
      const newCartRow = await Model.cart.create({
        userid: userid,
        productId: productId,
        quantity: quantity,
      });
      res.send(newCartRow);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove one product from Cart

Cartcontroller.removeFromCart = async (req, res) => {
  const userid = req.params.userid;
  const productId = req.body.productId;
  const quantity = req.body.quantity || 1;

  try {
    const cartRow = await Model.cart.findOne({
      where: {
        userid: userid,
        productId: productId,
      },
    });

    if (cartRow) {
      if (cartRow.quantity > quantity) {
        const newCartRow = await cartRow.decrement("quantity", {
          by: quantity,
        });
        newCartRow.quantity -= Number(quantity);
        res.send(newCartRow);
      } else if (cartRow.quantity == quantity) {
        await cartRow.destroy();
        res.send({ message: "Row deleted successfully" });
      } else {
        res.status(400).json({ message: "Insufficient quantity in cart" });
      }
    } else {
      res.status(404).json({ message: "Row not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all cart details by userid

Cartcontroller.getAllCartbyuserid = async (req, res) => {
  const userid = req.params.userid;
  try {
    const cartProducts = await Model.cart.findAll({
      where: { userid: userid },
      include: [
        {
          model: Model.product,
        },
      ],
    });

    return cartProducts;
  } catch (error) {
    throw new Error("Error retrieving cart products");
  }
};

//Get cart detail of a single product

Cartcontroller.getSingleCart = async (req, res) => {
  const userid = req.params.userid;
  const productId = req.body.productId;

  try {
    const cartProduct = await Model.cart.findOne({
      where: {
        userid: userid,
        productId: productId,
      },
      include: [
        {
          model: Model.product,
        },
      ],
    });

    if (cartProduct) {
      res.status(200).json({ cartProduct });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = Cartcontroller;
