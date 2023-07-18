const { default: axios } = require("axios");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ShipToken = require("../models/shiprocket.model");
const helperUtils = require("../utils/helperUtils");
const structureUtils = require("../utils/structure.utils");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Address = require("../models/address.model");
const { Console } = require("winston/lib/winston/transports");
require("dotenv").config();
const fs = require("fs");

const utils = {};

utils.ShippingPrice = async (req, res, next) => {
  try {
    if (!req?.body?.pinCode)
      return res.status(400).json({ message: "No pinCode provided" });

    const token = await ShipToken.findOne();

    const cartitems = await Cart.findAll({
      where: {
        userId: req?.user?.userId,
        status: "active",
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    let weightinkg = helperUtils.findWeight(cartitems);

    console.log(weightinkg);
    if (weightinkg < 0.5) {
      weightinkg = 0.5;
    }
    console.log(weightinkg);

    const service = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${process.env.pickup_postcode}&delivery_postcode=${req?.body?.pinCode}&cod=0&weight=${weightinkg}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );

    if (service.data.data.available_courier_companies.length === 0)
      return res.status(400).json({ message: "No Service Available" });
    let courier = service.data.data.available_courier_companies[0];
    req.courier = structureUtils.courier(courier);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

utils.CreateOrder = async (order) => {
  try {
    const token = await ShipToken.findOne();
    const dborder = await Order.findOne({
      where: {
        orderId: order.orderId,
      },
      include: [
        {
          model: Address,
        },
      ],
    });
    console.log(dborder.orderId);
    const order_items = await OrderItem.findAll({
      where: {
        orderId: dborder.orderId,
      },
      include: [{ model: Product }],
    });
    console.log(order_items.length);

    const weight = helperUtils.findWeight(order_items);

    const items = helperUtils.orderitemArray(order_items);
    var body = structureUtils.ShiprocketOrder(dborder, items, weight);
    const { data } = await axios.post(process.env.ordercreation, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const res = await axios.post(
      process.env.awb,
      {
        shipment_id: `${data.shipment_id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = utils;
