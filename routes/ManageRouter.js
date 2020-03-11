const express = require("express");
const router = express.Router();
const { ManageController } = require("../controlers");

router.get("/product", ManageController.getProduct);
router.get("/detailProduct/:id", ManageController.getProductDetail);
router.post("/addProduct", ManageController.postProduct);
router.put("/editProduct/:id", ManageController.editProduct);
router.delete("/product/:id", ManageController.deleteProduct);

module.exports = router;
