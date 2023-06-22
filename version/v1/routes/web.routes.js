const express = require("express");
const router = express.Router();

const webController = require("../controllers/web.controller");

const { validateBody } = require("../middleware/validation.middleware");
const webValidation = require("../validations/web.validation");

router.post("/getproductByCategory", validateBody(webValidation?.getProductByCategory), webController?.getProductByCategory);
router.post("/getSingleProductById", validateBody(webValidation?.getSingleProductById), webController?.getSingleProductById);

module.exports = router;
