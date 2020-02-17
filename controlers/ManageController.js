const db = require("../connection");
//kita import si db db dari folder connection
const fs = require("fs");
// const cryptogenerate = require("../helper/cryptopass");
const { uploader } = require("../helper/uploader");

module.exports = {
  // mulai get user, diambil dari data user
  getProduct: (req, res) => {
    let sql = `SELECT dp.id,dp.nama,dp.harga,dp.deskripsiAwal,dp.stock,dp.deskripsiFull,dp.newArrival,dk.kategori,dp.colomImage FROM data_product dp JOIN data_kategori dk ON dk.id = dp.kategoriId`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      // console.log(result);

      res.status(200).send({ dataProduct: result });
    });
  },

  postProduct: (req, res) => {
    console.log("masuk upload");
    try {
      const path = "/users/images"; //file save path
      const upload = uploader(path, "IMAGEUSER").fields([{ name: "image" }]);

      upload(req, res, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "upload gagal", error: err.message });
        }
        //foto baru telah terupload
        const { image } = req.files;
        // console.log("ini image", image);
        // console.log("ini req", req.files);
        const imagePath = image ? path + "/" + image[0].filename : null;

        // console.log(req.body.data);
        const data = JSON.parse(req.body.data);
        data.colomImage = imagePath; //tambhakan property image di object data dan image tersebut harus sesuai dengan coloms di tablenya
        // data.password = cryptogenerate(data.password); //menambahkan /ubah properti yg namanya password di object data dan password tersebut harus sesuai dengan collums di tablenya dan password sudah di encrypt melalui cryptogenerate

        console.log("masuk post");
        var sql = "INSERT INTO data_product SET ?";
        //   var sql untuk memasukan data baru kedalam users,dan setnya ini adalah req.body yg ingin kita masukan
        db.query(sql, data, (err, result) => {
          if (err) {
            console.log(err.message);
            return res.status(500).json({
              message: "there's an error on the server",
              error: err.message
            });
          }

          //   in juga data di ambil dari my sql
          sql = `SELECT dp.id,dp.nama,dp.harga,dp.deskripsiAwal,dp.stock,dp.deskripsiFull,dp.newArrival,dk.kategori,dp.colomImage FROM data_product dp JOIN data_kategori dk ON dk.id = dp.kategoriId`;
          db.query(sql, (err, result4) => {
            if (err) res.status(500).send(err);
            res.status(200).send({ dataProduct: result4 });
          });
        });
      });
    } catch (error) {
      res.send(error);
    }
  },
  //   berakhir post user disini
  //   result4 bisa dinamai apa aja namun harus sesuai
  // mulai edit user
  editProduct: (req, res) => {
    let userId = req.params.id;
    var sql = `SELECT * from data_product where id = ${userId};`; //yg ini mencari data yg sesuai dengan id yg di edit
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("EDIT");

      if (results.length) {
        const path = "/users/images"; //file save path
        const upload = uploader(path, "IMAGEUSER").fields([{ name: "image" }]);
        upload(req, res, err => {
          if (err) {
            return res.status(500).json({
              message: "there's an error on the server",
              error: err.message
            });
          }
          // foto baru telah upload
          // console.log("masuk upload");
          const { image } = req.files;
          // console.log("ini image", image);
          // console.log("ini req", req.files);
          const imagePath = image ? path + "/" + image[0].filename : null;
          // console.log("imgPath", imagePath);
          const data = JSON.parse(req.body.data);

          try {
            if (imagePath) {
              data.colomImage = imagePath;
            }

            // console.log("data", data);
            sql = `UPDATE data_product SET ? WHERE id = ${req.params.id}`;
            db.query(sql, data, (err, result) => {
              if (err) {
                console.log("salah query");
                if (imagePath) {
                  fs.unlinkSync("./public" + imagePath);
                }
                return res.status(500).json({
                  message:
                    "There's an error on the server. Please contact the administrator.",
                  error: err.message
                });
              }
              if (imagePath) {
                // jika berhasil, hapus foto yg lama
                console.log("benar query");
                if (results[0].image) {
                  fs.unlinkSync("./public" + results[0].image);
                }
              }
              console.log("berhasil put");
              sql = `SELECT dp.id,dp.nama,dp.harga,dp.deskripsiAwal,dp.stock,dp.deskripsiFull,dp.newArrival,dk.kategori,dp.colomImage FROM data_product dp JOIN data_kategori dk ON dk.id = dp.kategoriId`;
              db.query(sql, (err, result1) => {
                if (err) res.status(500).send(err);
                res.status(200).send({ dataProduct: result1 });
              });
            });
          } catch (err) {
            console.log(err.message);
            return res.status(500).json({
              message:
                "There's an error on the server. Please contact the administrator.",
              error: err.message
            });
          }
        });
      }
    });
  },
  // berakhir edit user

  // mulai delete user
  deleteProduct: (req, res) => {
    var sql = `delete from data_product where id=${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({
          message: "there's an error on the server",
          err: err.message
        });
      }
      //   in juga data di ambil dari my sql
      console.log(result);
      sql = `SELECT dp.id,dp.nama,dp.harga,dp.deskripsiAwal,dp.stock,dp.deskripsiFull,dp.newArrival,dk.kategori,dp.colomImage FROM data_product dp JOIN data_kategori dk ON dk.id = dp.kategoriId`;
      db.query(sql, (err, result3) => {
        if (err) res.status(500).send(err);
        res.status(200).send({ dataProduct: result3 });
      });
    });
  }
  // berakhir delete user disiini
};
