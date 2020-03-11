const express = require("express");
const router = express.Router();
const { LoginRegister } = require("../controlers");

router.post("/registerusers", LoginRegister.register);
router.get("/hashpasswprd", LoginRegister.cryptopass);
router.put("/verifikasiEmail", LoginRegister.emailVerifikasi);
router.get("/login", LoginRegister.login);
router.get("/login/:id", LoginRegister.login);

module.exports = router;
