const db = require("../connection");
//kita import si mysql db dari folder connection

module.exports = {
  // function get fish
  getData: (req, res) => {
    // syntax query
    let sql = "SELECT * FROM data_product order by rand() "; // SELECT * FROM
    // order by rand ini akan menampilkan hasilnya secacara random, kalau mau nampilin limitnya tinggal kasih query limit 3 atau brp

    // action syntax
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  },
  getDataHome: (req, res) => {
    // syntax query
    let sql = "SELECT * FROM data_product where newArrival = 'new' ";

    // action syntax
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  }
};
