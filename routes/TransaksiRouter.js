const express = require("express");
const router = express.Router();
const { TransaksiController } = require("../controlers");

router.post("/add-chart", TransaksiController.addChart);
router.get("/get-chart/:userid", TransaksiController.getChart);
router.post("/delete-cart/", TransaksiController.deleteCart);
router.post("/checkout/:id_user", TransaksiController.checkoutCart);
router.get("/get-total-harga/:id", TransaksiController.getTotalHarga);
module.exports = router;
