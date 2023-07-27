const express = require("express");
const router = express.Router();

const panelController = require("../controllers/panel.controller");

const adminValidation = require("../validations/admin.validation");
const { validateBody } = require("../middleware/validation.middleware");
const { validateAdmin } = require("../utils/auth.utils");

router.post("/addAdmin", validateBody(adminValidation?.addAdmin), panelController.addAdmin);
router.post("/addCategory", validateAdmin, validateBody(adminValidation?.addCategory), panelController?.addProductCategory);
router.post("/addProduct", validateAdmin, validateBody(adminValidation?.addProduct), panelController?.addproduct);
router.post("/addDiscountCode", validateAdmin, panelController?.addDiscountCode);
router.post("/getAllDiscountCode", validateAdmin, panelController.getAllDiscountCode);
router.post("/getAllProducts", validateAdmin, panelController.getAllProducts);
router.post("/adminLogin", panelController.adminLogin);
router.post("/toggleProductStatus", validateAdmin, panelController.toggleProductStatus);
router.post("/getAllCount", validateAdmin, panelController.getAllCount);
router.get("/getOders", panelController.getOders);
router.get("/popularproducts", panelController.TopsellingProducts);

module.exports = router;
