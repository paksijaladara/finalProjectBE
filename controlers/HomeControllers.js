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
  },
  getDataCarrousel: (req, res) => {
    let sql =
      "SELECT * FROM data_product WHERE kategoriId = 1 or kategoriId= 2 order by rand() limit 3";

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  },

  getDataCard: (req, res) => {
    // const id = req.query.kategoriId;
    // syntax query
    let sql = `SELECT * FROM data_product order by rand() limit 3 `; // SELECT * FROM
    // order by rand ini akan menampilkan hasilnya secacara random, kalau mau nampilin limitnya tinggal kasih query limit 3 atau brp

    // action syntax
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  }
};
