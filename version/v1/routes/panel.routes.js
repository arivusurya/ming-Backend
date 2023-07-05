const express = require("express");
const router = express.Router();

const panelController = require("../controllers/panel.controller");

const adminValidation = require("../validations/admin.validation");
const { validateBody } = require("../middleware/validation.middleware");
const { validateAdmin } = require("../utils/auth.utils");

router.post("/addAdmin", validateAdmin, validateBody(adminValidation?.addAdmin), panelController.addAdmin);
router.post("/addCategory", validateAdmin, validateBody(adminValidation?.addCategory), panelController?.addProductCategory);
router.post("/addProduct", validateAdmin, validateBody(adminValidation?.addProduct), panelController?.addproduct);
router.post("/addDiscountCode", validateAdmin, panelController?.addDiscountCode);
router.post("/getAllDiscountCode", validateAdmin, panelController.getAllDiscountCode);

module.exports = router;
