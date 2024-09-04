const upload = require("../middleware/upload");

module.exports = (app) => {

    const transaksi = require("../controllers/transaksi.controller")
    let router = require("express").Router() 

    //  Tambahkan middleware 'upload.single('file')' sebelum memanggil controllers
    router.post("/create", upload.single('file'), transaksi.create)


    app.use("/api/transaksi" , router)
  }