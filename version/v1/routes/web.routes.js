const express = require("express");
const router = express.Router();

const webController = require("../controllers/web.controller");

const { validateUser } = require("../utils/auth.utils");

const { validateBody } = require("../middleware/validation.middleware");
const webValidation = require("../validations/web.validation");

router.post("/getproductByCategory", validateBody(webValidation?.getProductByCategory), webController?.getProductByCategory);
router.post("/getSingleProductById", validateBody(webValidation?.getSingleProductById), webController?.getSingleProductById);
router.post("/searchProduct", webController.getProducts);
router.post("/purchaseProduct", validateUser, webController.purchaseProduct);

module.exports = router;
