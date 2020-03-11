const express = require("express");
const router = express.Router();
const { HomeControllers } = require("../controlers");

// route untuk get data ikan
router.get("/get-data", HomeControllers.getData);
router.get("/get-dataHome", HomeControllers.getDataHome);
router.get("/get-dataCard/", HomeControllers.getDataCard);
router.get("/get-carousell/", HomeControllers.getDataCarrousel);

module.exports = router;
