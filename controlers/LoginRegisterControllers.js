const cryptopass = require("../helper/cryptopass");
const db = require("../connection");
const fs = require("fs"); //file system
const transporter = require("../helper/mailer");
const { createJWTtoken } = require("../helper/jws");

module.exports = {
  cryptopass: (req, res) => {
    console.log(req.query);
    const hashpassword = cryptopass(req.query.password);
    res.send({ encrypt: hashpassword, panjangEncrypt: hashpassword.length });
  },
  register: (req, res) => {
    var { userName, password, email } = req.body;
    console.log("ini");
    var sql = `select userName from data_users where userName= '${userName}' and email= '${email}' `;
    db.query(sql, (err, results) => {
      if (err) {
        console.log("masuk sini");
        return res.status(500).send({ status: "error", err });
      }
      if (results.length > 0) {
        return res
          .status(200)
          .send({ status: "error", message: "username already exist" });
      } else {
        var hasilpassword = cryptopass(password);
        var dataUser = {
          userName,
          password: hasilpassword,
          email,
          status: "unverified",
          role: "user"
        };
        sql = `insert into data_users set ?`;
        db.query(sql, dataUser, (err1, res1) => {
          if (err1)
            return res
              .status(500)
              .send({ status: "error", message: "error server", err: err1 });
          var linkVerifikasi = `http://localhost:3000/verified?username=${userName}&password=${hasilpassword}`;
          var mailOptions = {
            from: "Aqua Davida < paksiiskap@gmail.com >",
            to: email,
            subject: "Verifikasi Email",
            html: `Click Link for  : 
                <a href=${linkVerifikasi}> Join to Aqua Davida </a>`
          };
          transporter.sendMail(mailOptions, (err2, res2) => {
            if (err2) return res.status(500).send({ err2 });
            return res
              .status(200)
              .send({ userName, email, status: "unverified" });
          });
        });
      }
    });
  },
  emailVerifikasi: (req, res) => {
    var { userName, password } = req.body;
    var sql = `SELECT * FROM data_users WHERE userName='${userName}'`;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).send({ status: "error", err });
      if (results.length === 0) {
        return res
          .status(500)
          .send({ status: "error", err1: "User tidak ditemukan" });
      }
      sql = `UPDATE data_users SET status='verified' WHERE userName='${userName}' and password='${password}'`;
      db.query(sql, (err, results2) => {
        if (err) {
          return res.status(500).send({ status: "error", err });
        } else {
          return res
            .status(200)
            .send({ userName: results[0].userName, status: "verified" });
        }
      });
    });
  },
  login: (req, res) => {
    const { userName, password } = req.query;
    const { id } = req.params;
    // console.log(password);

    if (id) {
      // console.log("masuk");
      // console.log("iduser", id);

      var sql = `SELECT id,userName,role,status FROM data_users WHERE id = ${id}`;
      db.query(sql, (err, result3) => {
        if (err) res.status(500).send({ status: "error", err });
        // if (result3.length === 0) {
        //   return res
        //     .status(200)
        //     .send({ status: "not match", error: "user tidak ada" });
        // }
        // const token = createJWTtoken({
        //   userid: result3[0].id,
        //   userName: result3[0].userName
        // });
        console.log(result3[0]);
        console.log("masuk kemari");
        return res.send({
          result: result3[0],
          status: "login success"
          // userName: result3[0].userName,
          // id: result3[0].id,
          // status: "login success",
          // token
        });
      });
    } else {
      var hashpassword = cryptopass(password);
      console.log(userName, hashpassword);
      var sql = `SELECT id,userName,role,status FROM data_users WHERE userName='${userName}' and password='${hashpassword}'`;
      db.query(sql, (err, result4) => {
        console.log(result4[0]);

        if (result4) {
          // console.log("masuk res cuk");
          return res
            .status(200)
            .send({ result: result4[0], status: "login success" });
        } else {
          // console.log("masuk sini cuk");

          return res.status(200).send({
            status: "error",
            message: "username / password not match"
          });
        }
      });
    }
  }
};
