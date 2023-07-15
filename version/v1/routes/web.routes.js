const express = require("express");
const router = express.Router();

const webController = require("../controllers/web.controller");

const { validateUser } = require("../utils/auth.utils");

const { validateBody } = require("../middleware/validation.middleware");
const webValidation = require("../validations/web.validation");
const { ShippingPrice } = require("../utils/shiprocket.utils");

router.post("/getProductByCategory", validateBody(webValidation?.getProductByCategory), webController?.getProductByCategory);
router.post("/getSingleProductById", validateBody(webValidation?.getSingleProductById), webController?.getSingleProductById);
router.post("/searchProduct", webController.getProducts);
// router.post("/purchaseProduct", validateUser, webController.purchaseProduct);
router.post("/userFeedback", validateBody(webValidation?.userFeedback), webController.userFeedback);
// router.get("/getcartbyuser", validateUser, webController.getCartByUserId);
// router.post("/addtocart", validateUser, webController.addtocart);
// router.post("/updatecart", validateUser, webController.updateCart);
router.post("/addReview", webController.addReview);
router.post("/addtocart", validateUser, webController.a2c);
router.post("/updatecart", validateUser, webController.u2c);
router.get("/getcartbyuser", validateUser, webController.g2c);
router.post("/addbulkcart", validateUser, webController.abc);
router.post("/makepayment", validateUser, ShippingPrice, webController.makepayment);
router.post("/servicecheck", validateUser, webController.servicecheck);
router.post("/verifyPayement", controller.PaymentVerification);
router.post("/failedpayments", controller.failedPayment);

module.exports = router;
