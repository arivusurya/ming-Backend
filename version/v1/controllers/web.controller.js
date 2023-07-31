const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");
const ProductPurchase = require("../models/cart.model");

const { v4 } = require("uuid");

const helperUtils = require("../utils/helperUtils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const sequelize = require("../models");
const Feedback = require("../models/feedback.model");
const Cart = require("../models/cart.model");
const Review = require("../models/review.model");

const razorpay = require("../utils/Razorpay.helper");
const OrderItem = require("../models/orderItem.model");
const Order = require("../models/order.model");
const { default: axios } = require("axios");
const ShipToken = require("../models/shiprocket.model");
const crypto = require("crypto");
const shiprocket = require("../utils/shiprocket.utils");

const Discount = require("../models/discount.model");
const DiscountUser = require("../models/discountUser.model");
const { Sequelize } = require("sequelize");
const { PaymentVerifed } = require("../utils/email.utils");

controller = {};

controller.getProductByCategory = handler(async (req, res) => {
  const product = await Product.findAll({
    where: {
      categoryId: req?.body?.categoryId,
      status: constantUtils.ACTIVE,
    },
  });
  if (!product) throw "400|Product_Not_Found!";

  const data = product?.map((each) => structureUtils.webProductStructure(each));

  return res.json(
    product?.map((each) => structureUtils.webProductStructure(each))
  );
});

controller.getSingleProductById = handler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      productId: req?.body?.productId,
      status: constantUtils.ACTIVE,
    },
  });
  if (!product) throw "400|Product_Not_Found!";

  return res.json(structureUtils.webProductStructure(product));
});

controller.getProducts = handler(async (req, res) => {
  const condition = {
    status: constantUtils.ACTIVE,
  };

  if (req?.body?.search) {
    condition["name"] = sequelize.where(
      sequelize.fn("LOWER", sequelize.col("name")),
      "LIKE",
      "%" + req?.body?.search?.toLowerCase() + "%"
    );
  } else {
    return res.json([]);
  }

  const products = await Product.findAll({
    where: condition,
    order: [["id", "ASC"]],
  });

  return res.json(
    products?.map((each) => structureUtils.webProductStructure(each))
  );
});

controller.addReview = handler(async (req, res) => {
  if (!req?.body?.name) throw "400|Name_Required!";
  if (!req?.body?.email) throw "400|Email_Required!";
  if (!req?.body?.review) throw "400|Review_Required!";
  if (!req?.body?.star) throw "400|Star_Required!";
  if (!req?.body?.productId) throw "400|Product_Id_Required!";

  let user;

  if (req?.body?.userId) {
    const existUser = await User.findOne({
      where: {
        userId: req?.body?.userId,
      },
    });
    user = existUser;
  }

  const review = await Review.create({
    name: req?.body?.name,
    email: req?.body?.email,
    review: req?.body?.review,
    star: req?.body?.star,
    userId: user?.userId,
    productId: req?.body?.productId,
  });

  if (!review) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

controller.a2c = handler(async (req, res) => {
  const userId = req?.user?.userId;
  const productId = req.body?.productId;
  const quantity = 1; //default value should be one

  const product = await Product.findOne({
    where: {
      productId: productId,
    },
  });
  if (!product) throw "404|Product Not Found";

  const existsrow = await Cart.findOne({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (existsrow) {
    existsrow.quantity += quantity;
    await existsrow.save();
    return res.status(200).json({ message: "Product quantity increased" });
  } else {
    let cart = await Cart.create({
      userId: userId,
      productId: productId,
      quantity: quantity,
      status: constantUtils.ACTIVE,
    });
    return res.status(200).json({ message: "Product add sucessfully" });
  }
});

controller.u2c = handler(async (req, res) => {
  const userId = req?.user?.userId;
  const productId = req.body?.productId;
  const quantity = req.body?.quantity;

  const product = await Product.findOne({
    where: {
      productId: productId,
    },
  });
  if (!product) throw "404|Product_Not_Found";

  let cart = await Cart.findOne({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (!cart) throw "404|Cart_Not_Found";

  if (quantity === 0) {
    await cart.destroy();
    return res.status(200).json({ message: "Cart Item Deleted" });
  }

  cart.quantity = quantity;
  await cart.save();
  return res.status(201).json({ message: "Cart Updated" });
});

controller.g2c = handler(async (req, res) => {
  if (!req.user?.userId) throw "400|User_Id_Required";
  const cart = await Cart.findAll({
    where: { userId: req.user?.userId, status: constantUtils.ACTIVE },
    include: [
      {
        model: Product,
      },
    ],
  });
  if (cart.length === 0) {
    return res.status(200).json({ message: "No cart ", cart: cart });
  }

  const formattedCart = cart.map((item) => {
    const product = item.product;
    return structureUtils.getCartStruce(product, item);
  });

  return res.status(200).json({ cart: formattedCart });
});

controller.getAllReviews = handler(async (req, res) => {
  if (!req?.body?.productId) throw "400|Product_Id_Required!";

  const reviews = await Review.findAll({
    where: { productId: req?.body?.productId },
    order: [["star", "DESC"]],
    limit: 10,
  });

  if (!reviews) throw "400|No_Review_Found!";

  const data = reviews.map((each) => structureUtils.reviewStructure(each));

  return res.json(data);
});

controller.userFeedback = handler(async (req, res) => {
  const feedback = await Feedback.create({
    userName: req?.body?.userName,
    email: req?.body?.userName,
    phoneNumber: helperUtils.encrypt(req?.body?.phoneNumber),
    subject: req?.body?.subject,
    message: req?.body?.message,
  });
  if (!feedback) throw "400|Somthing_Went_Wrong!";
  return res.json({
    message: "success",
  });
});

controller.compareDiscountCode = handler(async (req, res) => {
  if (!req?.body?.discountCode) throw "400|Discount_Code_Requried!";
  const ifCodeExist = await DiscountUser.findOne({
    where: {
      userId: req?.user?.userId,
      discountCode: req?.body?.discountCode,
    },
  });

  if (ifCodeExist) throw "400|Code_Already_Used!";

  const discountCode = await Discount.findOne({
    where: {
      discountCode: req?.body?.discountCode,
    },
  });

  if (!discountCode) throw "400|No_Discount_Code_Found!";

  const currentDate = new Date();

  let action = true;

  if (currentDate < discountCode?.startDate) {
    action = false;
  }

  if (currentDate > discountCode?.endDate) {
    action = false;
  }

  if (!action) throw "400|Dicount_Code_Expired!";

  if (action) {
    const discountUser = await DiscountUser.create({
      userId: req?.user?.userId,
      discountCode: req?.body?.discountCode,
      discountId: discountCode?.discountId,
      dateTime: new Date(),
      time: new Date(),
    });
  }

  if (action)
    return res.json(structureUtils.compareDiscountStructure(discountCode));
});

controller.abc = handler(async (req, res) => {
  if (!req?.user?.userId) throw "400|User_Id_Required!";
  if (req?.body?.length === 0) throw "400|No_Product_Found!";
  if (!Array.isArray(req?.body)) throw "400|Array_Only!";

  const cart = await Cart.findAll({
    where: { userId: req.user.userId },
  });

  const newarray = [];
  for (const e of req.body) {
    const product = await Product.findOne({
      where: { productId: e.productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    newarray.push({
      userId: req.user.userId,
      productId: e.productId,
      quantity: e.quantity,
      status: constantUtils.ACTIVE,
    });
  }

  if (cart.length === 0) {
    await Cart.bulkCreate(newarray);
    return res.status(201).json({ message: "Product added successfully" });
  }

  for (const e of newarray) {
    let existing = await Cart.findOne({
      where: { userId: req.user.userId, productId: e.productId },
    });
    if (existing) {
      existing.quantity += e.quantity;
      await existing.save();
    } else {
      await Cart.create(e);
    }
  }

  return res.status(200).json({ message: "Cart updated successfully" });
});

controller.makepayment = handler(async (req, res) => {
  let userId = req?.user?.userId;
  let courier = req?.courier;
  try {
    const cartitems = await Cart.findAll({
      where: {
        userId: userId,
        status: constantUtils.ACTIVE,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    let productcost = helperUtils.FindProductCost(cartitems);
    let amount = 0;
    if (productcost > 1000) {
      amount = productcost;
    } else {
      amount = productcost + courier?.price;
    }

    const order = await razorpay.orders.create({
      currency: "INR",
      receipt: v4(),
      payment_capture: 1,
      amount: amount * 100,
    });
    let orderItems = helperUtils.cartitems(order?.id, cartitems);
    const dborder = await Order.create({
      orderId: order.id,
      userId: req?.user?.userId,
      Productcost: productcost,
      shippingCost: courier?.price,
      amount: amount,
      addressId: req?.body?.addressId,
      hasPaid: constantUtils.PENDING,
      status: constantUtils.INACTIVE,
      shippingMethod: courier.courier_name,
      isFreeShipping:
        productcost > 1000
          ? constantUtils.FreeShiping
          : constantUtils.PaidShipping,
    });

    await OrderItem.bulkCreate(orderItems);
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
});

controller.servicecheck = handler(async (req, res) => {
  if (!req?.body?.pincode) throw "400|please provide valid Pin Code";

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

  if(cartitems.length ===0){
    return res.status(400).json({message:"Please Add the product to proceed"})
  }

  let weightinkg = helperUtils.findWeight(cartitems);

  console.log(weightinkg);
  if (weightinkg < 0.5) {
    weightinkg = 0.5;
  }
  console.log(weightinkg);

  const service = await axios.get(
    `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${process.env.PICKUP_POSTCODE}&delivery_postcode=${req?.body?.pincode}&cod=0&weight=${weightinkg}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    }
  );
  if(!service?.data?.data?.available_courier_companies){
    return res.status(400).json({message:"please give valid Pincode"})
  }

  if (service?.data?.data?.available_courier_companies.length === 0)
    throw "400|No_Service_Avalialbe_On_This_Pincode";
  let courier = service?.data?.data?.available_courier_companies[0];

  return res.json(structureUtils.courier(courier));
});

controller.PaymentVerification = handler(async (req, res) => {
  try {
    const body = req?.body?.payload;
    const signature = req?.headers["x-razorpay-signature"];
    const check = crypto.createHmac(
      "sha256",
      process.env.PAYMENT_VERIFY_SECRET
    );
    check.update(JSON.stringify(req?.body));
    const mysign = check.digest("hex");
    if (mysign === signature) {
      const order = await Order.findOne({
        where: { orderId: body.payment.entity.order_id },
      });
      order.paymentId = body.payment.entity.id;
      order.hasPaid = constantUtils.PAID;
      order.status = constantUtils.ACTIVEORDERS;
      let user_id = order.userId;

      // if (order.shipprocketOrderId === null) {
        let shipingdata = await shiprocket.CreateOrder(order);
        // order.shipprocketOrderId = shipingdata?.order_id;
        await order.save();
      }
      await order.save();
      const user = await User.findOne({ where: { userId: user_id } });
      const orderItem = await OrderItem.findAll({
        where: {
          orderId: order?.orderId,
        },
        include: [
          {
            model: Product,
          },
        ],
      });

      await PaymentVerifed(
        user?.email,
        order,
        structureUtils.AdminOrderItem(orderItem)
      );

      let cart = await Cart.findAll({
        where: { userId: user_id, status: "active" },
      });

      cart.map(async (e) => {
        await e.destroy();
      });

      await order.save();

      return res.status(200).json({ message: "ok" });
    }
  } catch (error) {
    res.status(200).json({ message: "ok" });
  }
});

controller.failedPayment = handler(async (req, res) => {
  const entity = req?.body?.payload?.payment?.entity;
  const signature = req?.headers["x-razorpay-signature"];
  const check = crypto.createHmac("sha256", process.env.PAYMENT_VERIFY_SECRET);
  check.update(JSON.stringify(req?.body));
  const mysign = check.digest("hex");

  if (mysign === signature) {
    const order = await Order.findOne({
      where: { orderId: entity.order_id },
    });
    order.paymentId = entity.id;
    order.hasPaid = constantUtils.FAILED;
    await order.save();
  }

  return res.status(200).json({ message: "ok" });
});

controller.orderItems = async (req, res) => {
  req.body?.orderId;
  const order_items = await OrderItem.findAll({
    where: {
      orderId: req?.body?.orderId,
    },
    include: [{ model: Product }],
  });

  console.log(order_items);
  return res.json(order_items);
};

controller.getUserOrderHistory = handler(async (req, res) => {
  const condition = {
    userId: req?.user?.userId,
  };

  if (req?.body?.status) condition["status"] = req?.body?.status;

  const order = await Order.findAll({
    where: condition,
    limit: req?.body?.limit ?? 5,
    skip: req?.body?.skip ?? 0,
    include: [
      {
        model: OrderItem,
        include: [{ model: Product }],
        required: true,
      },
    ],
  });

  return res.json(order);
});

module.exports = controller;
