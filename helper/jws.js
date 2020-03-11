const jwt = require("jsonwebtoken");

module.exports = {
  createJWTtoken(payload) {
    return jwt.sign(payload, "paksi", { expiresIn: "5h" });
  }
};
