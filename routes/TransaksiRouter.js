const express = require("express");
const router = express.Router();
const { TransaksiController } = require("../controlers");

router.post("/add-chart", TransaksiController.addChart);
router.get("/get-chart/:userid", TransaksiController.getChart);
router.post("/delete-cart/", TransaksiController.deleteCart);
module.exports = router;
