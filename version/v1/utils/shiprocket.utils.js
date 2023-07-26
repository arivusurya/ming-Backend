require("dotenv").config();
const { default: axios } = require("axios");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ShipToken = require("../models/shiprocket.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Address = require("../models/address.model");

const helperUtils = require("../utils/helperUtils");
const structureUtils = require("../utils/structure.utils");
const constantUtils = require("../utils/constant.utils");

const utils = {};

utils.ShippingPrice = async (req, res, next) => {
  try {
    if (!req?.body?.pinCode)
      return res.status(400).json({ message: "No pinCode provided" });

    const token = await ShipToken.findOne();

    const cartitems = await Cart.findAll({
      where: {
        userId: req?.user?.userId,
        status: constantUtils.ACTIVE,
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
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${process.env.PICKUP_POSTCODE}&delivery_postcode=${req?.body?.pinCode}&cod=0&weight=${weightinkg}`,
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
    const { data } = await axios.post(process.env.ORDER_CREATION, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    return data;

    // const res = await axios.post(
    //   process.env.AWB_CODE,
    //   {
    //     shipment_id: `${data.shipment_id}`,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token.token}`,
    //     },
    //   }
    // );
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

utils.getspecifcorder = async (order_id) => {
  console.log(order_id);
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5MDE5ODk1NiwiZXhwIjoxNjkxMDYyOTU2LCJuYmYiOjE2OTAxOTg5NTYsImp0aSI6IkNRbjdqUjFrNkRwbGlMVXUiLCJzdWIiOjMwNTgyNDMsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.W17JUuL86wckQlHugeL6E4l4Bs_SkPlCsnVRw1-64LA";
  try {
    const { data } = await axios.get(
      process.env.getorderDetails + `${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.shipments.id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = utils;
