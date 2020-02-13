const cryptopass = require("../helper/cryptopass");
const db = require("../connection");

module.exports = {
  register: (req, res) => {
    var { userName, password, email } = req.body;
    var sql = `select userName from data_users where userName= '${userName}' and email= '${email}' `;
    // console.log(email);
    db.query(sql, (err, results) => {
      if (err) {
        console.log("masuk sini");
        return res.status(500).send({ status: "error", err });
      }
      if (results.length > 0) {
        return res
          .status(200)
          .send({ status: "error", message: "username has been taken" });
      } else {
        var hasilpassword = cryptopass(password);
        var dataUser = {
          userName,
          password: hasilpassword,
          email,
          status: "unverified",
          roleId: "2"
        };
        sql = `insert into data_users set ?`;
        db.query(sql, dataUser, (err1, res1) => {
          if (err1) {
            return res
              .status(500)
              .send({ status: "error", message: "error server", err: err1 });
          }
          return res.status(200).send({ status: "success" });
        });
      }
    });
  },
  login: (req, res) => {
    var { userName, password } = req.body;
    var hasilpassword = cryptopass(password);
    var sql = `select * from data_users where userName='${userName}' and password='${hasilpassword}'`;

    mysql.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        return res.status(200).send({ result, status: "Login berhasil" });
      } else {
        return res.status(500).send({
          status: "error",
          message: "username atau password sudah ada",
          err
        });
      }
    });
  }
};
