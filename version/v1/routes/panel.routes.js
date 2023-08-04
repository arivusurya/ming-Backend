const express = require("express");
const router = express.Router();

const panelController = require("../controllers/panel.controller");

const adminValidation = require("../validations/admin.validation");
const { validateBody } = require("../middleware/validation.middleware");
const { validateAdmin } = require("../utils/auth.utils");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const { Sequelize } = require("sequelize");
const Product = require("../models/product.model");
const OrderItem = require("../models/orderItem.model");
const Category = require("../models/category.model");
const Address = require("../models/address.model");
const structureUtils = require("../utils/structure.utils");

router.post("/addAdmin", validateBody(adminValidation?.addAdmin), panelController.addAdmin);
router.post("/addCategory", validateAdmin, validateBody(adminValidation?.addCategory), panelController?.addProductCategory);
router.post("/addProduct", panelController?.addproduct);
router.post("/addDiscountCode", validateAdmin, panelController?.addDiscountCode);
router.post("/getAllDiscountCode", validateAdmin, panelController.getAllDiscountCode);
router.post("/getAllProducts", validateAdmin, panelController.getAllProducts);
router.post("/adminLogin", panelController.adminLogin);
router.post("/toggleProductStatus", validateAdmin, panelController.toggleProductStatus);
router.post("/getAllCount", validateAdmin, panelController.getAllCount);
router.get("/getOders", panelController.getOders);
router.get("/popularproducts", panelController.TopsellingProducts);
router.get("/getalluser", panelController.getuser);
router.delete("/deleteuser/:id", panelController.DeleteAccount);
router.get("/allreview", panelController.getAllReviews);
router.get("/deletereview/:id", panelController.dlreview);
router.get("/cartrate", panelController.getAbandonedCartRate);

router.get("/salesdata", panelController.averageOrderValue);
router.get("/orderStatusDistribution", panelController.orderStatusDistribution);
router.get("/orderfrequency", panelController.getOrderFrequency);
router.get("/customer-segmentation", panelController.userSegment);
router.get("/orderAnalytis", panelController.ordersAnalytis);
router.get("/orderondate", panelController.ordersondate);
router.get("/getuserOrder", panelController.UserOrder);
router.get("/productanalysis", panelController.productanalysis);

module.exports = router;
