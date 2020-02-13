const express = require("express");
const router = express.Router();
const { LoginRegister } = require("../controlers");

router.post("/registerusers", LoginRegister.register);
router.post("/login", LoginRegister.login);

module.exports = router;
