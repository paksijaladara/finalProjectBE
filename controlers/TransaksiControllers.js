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
    const { userid } = req.body;
    let sql = `select * from data_transaksi where id_user= ? and status_order='chart'`;
    db.query(sql, parseInt(userid), (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  }
};
