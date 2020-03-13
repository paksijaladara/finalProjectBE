const db = require("../connection");

module.exports = {
  // add chart
  addChart: (req, res) => {
    const data = {
      id_user: parseInt(req.body.userid),
      id_product: parseInt(req.body.data.id),
      status_order: "chart"
    };
    let sql = "insert into data_transaksi set ?";

    db.query(sql, data, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  getChart: (req, res) => {
    var userid = req.params.userid;
    // let sql = `select * from data_transaksi join where id_user= ${userid} and status_order='chart'`
    let sql = `SELECT 
                  dt.id, dt.id_user, dp.nama, dp.colomImage, dp.harga
              FROM
                  data_transaksi dt
                      JOIN
                  data_product dp ON dp.id = dt.id_product
              WHERE
                  id_user = ${userid} AND status_order = 'chart';`;

    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  deleteCart: (req, res) => {
    const id = parseInt(req.body.id);
    const id_user = parseInt(req.body.id_user);

    var sql = `delete from data_transaksi where id=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        // console.log(err.message);
        return res.status(500).json({
          message: "there's an error on this transaction",
          err: err.message
        });
      }
      res.status(200).send({ deleteStatus: true });
      // console.log(result);

      //     sql = `SELECT
      //     dt.id, dt.id_user, dp.nama, dp.colomImage, dp.harga
      // FROM
      //     data_transaksi dt
      //         JOIN
      //     data_product dp ON dp.id = dt.id_product
      // WHERE
      //     id_user = ${userid} AND status_order = 'chart' `;
      //     db.query(sql, (err, hasil) => {
      //       if (err) res.status(500).send(err);
      //       console.log("getData");
      //       res.status(200).send({ deleteCart: hasil });
      //     });
    });
  }
};
