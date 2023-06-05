const Model = require("../model");

const Ordercontroller = {};

// create a new Order
Ordercontroller.createOrder = async (req, res) => {
    try {
        const userid = req.params.userid
      const { productId, quantity } = req.body;
  
      //Need to check if there is stock available
      const order = await Model.order.create({
        userid,
        productId,
        quantity,
      });
  
      res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


//get one order
Ordercontroller.getOrder = async (req, res) => {
    try {
      const userid = req.params.userid;
      const productId = req.body.productId;
  
      const order = await Model.order.findOne({
        where: { userid: userid, productId: productId },
        include: [{
            model: Model.user, 
            model: Model.product
        }],
      });
  
      if (order) {
        res.status(200).json({ order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



// get all order for a user

Ordercontroller.getOrdersByuserid = async (req, res) => {
    try {
      const userid = req.params.userid;
  
      const orders = await Model.order.findAll({
        where: { userid: userid },
        include: [{
            model: Model.user, 
            model: Model.product
        }],
      });
  
      res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = Ordercontroller;
