const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");
const Order = require("../models/order.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const Discount = require("../models/discount.model");
const sequelize = require("../models");
const OrderItem = require("../models/orderItem.model");
const { date } = require("joi");
const { Sequelize, Op } = require("sequelize");
const Cart = require("../models/cart.model");
const Review = require("../models/review.model");
const { Console } = require("winston/lib/winston/transports");

controller = {};

controller.addAdmin = handler(async (req, res) => {
  const adminId = parseInt(helperUtils.generateRandomNumber(8));
  const admin = await Admin.create({
    adminId: adminId,
    adminName: req?.body?.adminName,
    email: req?.body?.email,
    password: req?.body?.password,
    accessToken: authUtils.adminToken(adminId),
    image: req?.body?.image,
    addedBy: req?.admin?.adminId,
    dateTime: new Date(),
    privilege: req?.body?.privilege,
  });
  if (!admin) throw "400|Somthing_Went_Wrong!";
  return res.json({
    messsage: "success!",
  });
});

controller.addProductCategory = handler(async (req, res) => {
  const categoryId = parseInt(helperUtils.generateRandomNumber(8));
  const category = await Category.create({
    categoryId: categoryId,
    name: req?.body?.name,
    image: req?.body?.image,
    addedBy: req?.admin?.adminId,
  });
  if (!category) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

controller.addproduct = handler(async (req, res) => {
  try {
    const productData = req.body;
    console.log(req?.body);
    const productId = parseInt(helperUtils?.generateRandomNumber(8));

    // // Check if the category exists in the database
    const category = await Category.findOne({
      where: { name: productData?.type },
    });
    if (!category) {
      // Handle the case when the category does not exist
      return res.status(400).json({ error: "Category not found." });
    }

    // // If the category exists, create the product
    const product = await Product.create({
      productId: productId,
      categoryId: category?.categoryId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      categoryType: category?.name,
      weight: productData.weight,
      image: productData?.mainImage,
      images: productData?.additionalImages || [],
    });

    if (!product) {
      // Handle the case when the product creation fails
      return res
        .status(400)
        .json({ error: "Something went wrong while creating the product." });
    }

    return res.json({ message: "Product created successfully!" });
  } catch (error) {
    console.log(error);
    // Handle other potential errors, such as validation errors or database issues
    return res.status(400).json({ error: "Something went wrong!" });
  }
});

controller.addDiscountCode = handler(async (req, res) => {
  if (!req?.body?.discountCode) throw "400|Discount_Code_Required!";
  if (!req?.body?.amount) throw "400|Amount_Required!";
  if (!req?.body?.startDate) throw "400|Start_Date_Required!";
  if (!req?.body?.endDate) throw "400|End_Date_Required!";

  const discountId = helperUtils.generateRandomNumber(8);
  const discount = await Discount.create({
    discountId: discountId,
    discountCode: req?.body?.discountCode,
    amount: req?.body?.amount,
    startDate: req?.body?.startDate,
    endDate: req?.body?.endDate,
    addedBy: req?.admin?.adminId,
  });

  if (!discount) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

controller.getAllDiscountCode = handler(async (req, res) => {
  const condition = {};

  if (req?.body?.status) condition["status"] = req?.body?.status;

  const discount = await Discount.findAll(condition);

  const discountData = discount?.map((each) =>
    structureUtils.discountStructure(each)
  );

  return res.json(discountData);
});

controller.getAllProducts = handler(async (req, res) => {
  const condition = {};

  if (req?.body?.status) condition["status"] = req?.body?.status;

  if (req?.body?.categoryType)
    condition["categoryType"] = req?.body?.categoryType;

  const products = await Product.findAll({
    where: condition,
    order: [["id", "ASC"]],
  });

  return res.json(
    products?.map((each) => structureUtils.panelProductStructure(each))
  );
});

controller.adminLogin = handler(async (req, res) => {
  if (!req?.body?.email) throw "400|Email_Required!";
  if (!req?.body?.password) throw "400|Password_Required!";

  const admin = await Admin.findOne({
    where: {
      email: req?.body?.email,
      password: req?.body?.password,
    },
  });

  if (!admin) throw "400|Admin_Not_Found!";

  return res.json(admin);
});

controller.toggleProductStatus = handler(async (req, res) => {
  if (!req?.body?.productId) throw "400|ProductId_Required!";
  if (!req?.body?.status) throw "400|Status_Required!";
  const toogleStatus = await Product.findOne({
    where: {
      productId: req?.body?.productId,
    },
  });
  if (!toogleStatus) throw "400|Product_Not_Found!";
  toogleStatus.status = req?.body?.status;
  await toogleStatus.save();

  return res.json({
    message: "success!",
  });
});

controller.getAllCount = handler(async (req, res) => {
  const product = await Product.count({
    where: {
      status: constantUtils.ACTIVE,
    },
  });

  const order = await Order.count({
    where: {
      status: constantUtils.ACTIVEORDERS,
    },
  });

  const user = await User.count({
    where: {
      status: constantUtils.ACTIVE,
    },
  });

  const transection = await Order.count({
    where: {
      status: constantUtils.ACTIVE,
      hasPaid: constantUtils.PAID,
    },
  });
  return res.json({
    productCount: product,
    orderCount: order,
    CustomerCount: user,
    transection: transection,
  });
});
controller.getOders = handler(async (req, res) => {
  try {
    const { status, page } = req?.query;
    const ItemperPage = 15;
    const PageNum = parseInt(page, 10) || 1;

    const order = await Order.findAndCountAll({
      where: {
        status: status,
      },
      include: [
        {
          model: User,
        },
        {
          model: OrderItem,
          include: Product,
        },
        {
          model: Address,
        },
      ],
      offset: (PageNum - 1) * ItemperPage,
      limit: ItemperPage,
      order: [["date", "DESC"]],
    });
    const totalpage = Math.ceil(order.count / ItemperPage);

    return res.json({
      orders: structureUtils.AdminActiveOrder(order.rows),
      totalpage: totalpage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

controller.UserOrder = handler(async (req, res) => {
  const { email } = req?.query;
  try {
    if (email) {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ message: "Not Found" });
      }
      const order = await Order.findAll({
        where: { userId: user?.userId },
        include: [
          {
            model: User,
          },
          {
            model: OrderItem,
            include: Product,
          },
          {
            model: Address,
          },
        ],

        limit: 15,
        order: [["date", "DESC"]],
      });

      return res
        .status(200)
        .json({ orders: structureUtils.AdminActiveOrder(order) });
    }
  } catch (error) {
    console.log(error);
  }
});

controller.TopsellingProducts = handler(async (req, res) => {
  try {
    const topproducts = await OrderItem.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalUnits"],
        [Sequelize.col("image"), "imageUrl"],
        [Sequelize.col("name"), "Productname"],
        // Include the 'imageUrl' attribute from the 'products' table
      ],
      include: [
        {
          model: Product,
          attributes: [], // Include only the 'name' attribute from the 'products' table
        },
      ],
      group: ["productId", "name", "image"], // Group by productId, Product.name, and Product.imageUrl
      order: [[Sequelize.literal("totalUnits"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ product: topproducts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

controller.getuser = handler(async (req, res) => {
  const { page = 1, status } = req.query;
  const limit = 15; // Number of records per page
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (status) {
    whereClause.status = status;
  }

  const users = await User.findAll({
    where: whereClause,
    limit,
    offset,
  });

  const totalUsers = await User.count({ where: whereClause });

  res.status(200).json({
    users: structureUtils.AdminUser(users),
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
  });
});

controller.DeleteAccount = handler(async (req, res) => {
  console.log(req?.params?.id);
  const user = await User.findOne({
    where: { userId: req?.params?.id },
    include: [
      {
        model: Address,
      },
      {
        model: Order,
        include: OrderItem,
      },
      {
        model: Cart,
      },
    ],
  });
  console.log(user);
  await user.destroy();
  res.status(200).json({ message: "User Data cleared" });
});

controller.getAllReviews = handler(async (req, res) => {
  try {
    const review = await Review.findAll({
      where: { status: constantUtils.ACTIVE },
      include: [{ model: Product }],
    });

    res.status(200).json({ review });
  } catch (error) {}
});

controller.dlreview = async (req, res) => {
  const review = await Review.findOne({ where: { id: req?.params?.id } });
  review.status = constantUtils.INACTIVE;
  await review.save();
  res.status(204).json({ message: "Oke" });
};

controller.getAbandonedCartRate = async (req, res) => {
  try {
    const abandonedCartQuery = `
      SELECT COUNT(*) as abandonedCarts
      FROM carts
      LEFT JOIN orderItems ON carts.productId = orderItems.productId
      WHERE carts.status = 'active' AND orderItems.id IS NULL
    `;

    const [result] = await sequelize.query(abandonedCartQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const totalCarts = await Cart.count({ where: { status: "active" } });

    const abandonedCartRate =
      totalCarts > 0 ? result.abandonedCarts / totalCarts : 0;

    res.status(200).json(abandonedCartRate);
  } catch (error) {
    console.error("Error calculating abandoned cart rate:", error);
    return 0;
  }
};

controller.averageOrderValue = async (req, res) => {
  const { timePeriod } = req.query;
  const { startDate, endDate } = helperUtils.getStartAndEndDate(timePeriod);

  try {
    const totalSales = await Order.sum("amount", {
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const orderCount = await Order.count({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const averageOrderValue = totalSales / orderCount;

    const salesData = await Order.findAll({
      attributes: [
        [
          sequelize.fn("date_format", sequelize.col("date"), "%Y-%m-%d"),
          "date",
        ],
        [sequelize.fn("sum", sequelize.col("amount")), "sales"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: [sequelize.fn("date_format", sequelize.col("date"), "%Y-%m-%d")],
    });

    res.json({ totalSales, averageOrderValue, salesData });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Unable to fetch sales data." });
  }
};

controller.ordersAnalytis = async (req, res) => {
  const { timePeriod } = req.query;
  const { startDate, endDate } = helperUtils.getStartAndEndDate(timePeriod);

  try {
    const ordersData = await Order.findAll({
      attributes: [
        [
          sequelize.fn("date_format", sequelize.col("date"), "%Y-%m-%d"),
          "date",
        ],
        [sequelize.fn("sum", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("count", sequelize.col("id")), "orderCount"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: [sequelize.fn("date_format", sequelize.col("date"), "%Y-%m-%d")],
    });

    res.json({ ordersData });
  } catch (error) {
    console.error("Error fetching orders data:", error);
    res.status(500).json({ error: "Unable to fetch orders data." });
  }
};

controller.orderStatusDistribution = handler(async (req, res) => {
  try {
    const statusDistribution = await Order.findAll({
      attributes: [
        "status",
        [sequelize.fn("count", sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });
    res.json(statusDistribution);
  } catch (error) {
    console.error("Error fetching order status distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

controller.getOrderFrequency = async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const startDate = new Date();
    const endDate = new Date();

    if (timePeriod === "weekly") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timePeriod === "monthly") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (timePeriod === "yearly") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const orderFrequency = await Order.findAll({
      attributes: [
        [Sequelize.col("userName"), "userName"], // Include the username from the User model
        [Sequelize.fn("count", Sequelize.col("userName")), "frequency"],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: User,
          attributes: [], // Specify the attributes you want to include from the User model, e.g., ["username"]
        },
      ],
      group: [Sequelize.col("userName")], // Group by the username instead of userId
    });

    res.json(orderFrequency);
  } catch (error) {
    console.error("Error fetching order frequency:", error);
    res.status(500).json({ error: "Failed to fetch order frequency." });
  }
};

controller.userSegment = handler(async (req, res) => {
  try {
    const { minOrderAmount, maxOrderAmount } = req.query;

    // Find customers with orders within the specified amount range
    const customers = await User.findAll({
      include: [
        {
          model: Order,
          where: {
            amount: {
              [Sequelize.Op.between]: [minOrderAmount, maxOrderAmount],
            },
          },
          attributes: ["userId"],
          group: ["userId"],
          as: "orders",
        },
      ],
    });

    // Map the customers to create the segmentedCustomers array
    const segmentedCustomers = customers?.map((customer) => ({
      customerId: customer?.userId,
      username: customer?.userName,
    }));

    res.status(200).json({ segmentedCustomers });
  } catch (error) {
    console.error("Error performing customer segmentation:", error);
    res.status(400).json({ error: "Internal server error" });
  }
});

controller.ordersondate = handler(async (req, res) => {
  try {
    const { date } = req?.query;
    const order = await Order.findAll({
      where: {
        date: new Date(date),
      },
      include: [
        {
          model: User,
        },
        {
          model: OrderItem,
          include: Product,
        },
        {
          model: Address,
        },
      ],
    });
    return res.json({
      orders: structureUtils.AdminActiveOrder(order),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "somthing went wrong" });
  }
});

controller.productanalysis = handler(async (req, res) => {
  const productId = req?.query?.id;
  try {
    const product = await Product.findOne({
      where: {
        productId: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const totalUnitsSold = await OrderItem.sum("quantity", {
      where: {
        productId,
      },
    });
    console.log(product);
    console.log(totalUnitsSold);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const currentDate = new Date();

    const dateWiseSales = await OrderItem.findAll({
      attributes: [
        "date",
        [Sequelize.fn("sum", Sequelize.col("quantity")), "totalSold"],
      ],
      where: {
        productId,
        date: {
          [Op.between]: [
            thirtyDaysAgo.toISOString().split("T")[0], // Format to "YYYY-MM-DD"
            currentDate.toISOString().split("T")[0], // Format to "YYYY-MM-DD"
          ],
        },
      },
      group: "date",
      raw: true,
    });
    console.log(dateWiseSales);
    res.json({
      product,
      totalUnitsSold,
      dateWiseSales,
    });
  } catch (error) {
    console.error("Error fetching product details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = controller;
