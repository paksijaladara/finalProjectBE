const db = require("../connection");

module.exports = {
  // add chart
  addChart: (req, res) => {
    console.log(req.body.data);
    const data = {
      id_user: parseInt(req.body.userid),
      id_product: parseInt(req.body.id_product),
      quantity_product: parseInt(req.body.quantity_product),
      status: "cart"
    };
    let sql = "insert into data_transaksi_detail set ?";

    db.query(sql, data, (err, result) => {
      if (err) res.status(500).send(err);
      let sql = `SELECT 
      dtd.id_detail, dtd.id_user, dp.nama, dp.colomImage, dp.harga
  FROM
      data_transaksi_detail dtd
          JOIN
      data_product dp ON dp.id = dtd.id_product
  WHERE
      id_user = ${data.id_user} AND status = 'cart';`;

      db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      });
    });
  },
  getChart: (req, res) => {
    var userid = req.params.userid;
    let sql = `SELECT 
                  dtd.id_detail, dtd.id_user, dtd.quantity_product , dp.nama, dp.colomImage, dp.harga
              FROM
                  data_transaksi_detail dtd
                      JOIN
                  data_product dp ON dp.id = dtd.id_product
              WHERE
                  id_user = ${userid} AND status = 'cart';`;

    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  deleteCart: (req, res) => {
    const id_detail = parseInt(req.body.id_detail);

    var sql = `delete from data_transaksi_detail where id_detail=${id_detail}`;
    db.query(sql, (err, result) => {
      if (err) {
        // console.log(err.message);
        return res.status(500).json({
          message: "there's an error on this transaction",
          err: err.message
        });
      }
      res.status(200).send({ deleteStatus: true });
    });
  },

  checkoutCart: (req, res) => {
    var id_user = req.params.id_user;
    var { total_price } = req.body;
    var data = {
      id_user,
      total_price
    };
    var sql = `INSERT INTO data_transaksi set ?`;
    mysql.query(sql, data, (err, result) => {
      if (err) return res.status(500).send(err);
      var data2 = {
        id_transaksi: result.insertId,
        status: "on process"
      };
      sql = `UPDATE data_transaksi_detail set? where id_user=${id_user} and status='cart'`;
      mysql.query(sql, data2, (err1, result1) => {
        if (err1) res.status(500).send(err1);
      });
      return res.status(200).send(result);
    });
  },

  getTotalHarga: (req, res) => {
    var id = req.params.id;
    console.log(id);
    var sql = `select total_price from data_transaksi where id_user=${id}`;
    mysql.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      console.log(result);
      return res.status(200).send(result);
    });
  },

  postTransaction: (req, res) => {}
};
