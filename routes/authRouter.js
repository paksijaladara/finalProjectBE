const express = require("express");
const router = express.Router();
const { authController } = require("../controlers");

router.get("/product", authController.getProduct);
router.post("/addProduct", authController.postProduct);
router.put("/editProduct/:id", authController.editProduct);
router.delete("/product/:id", authController.deleteProduct);

module.exports = router;
