const {where} = require ('sequelize');
const db = require('../models');
const Transaksi = db.transaksi
const Dtransaksi = db.dtransaksi
const User = db.user
const Kamar = db.kamar
const JenisKamar = db.JenisKamar
const moment = require('moment');
const upload = require('../middleware/upload'); // import middleware multer

// untuk tambah data
exports.create = async (req, res) => { 
    console.log(req.body)
    const {id_user, items, check_in, check_out, metode_pembayaran} = req.body

    try{
      // jika ada file yang diupload, ambil path nya
      let buktitransaksiPath = req.file ? req.file.path : null;

      // if (!buktitransaksiPath) {
      //   return res.status(400).send("Bukti transaksi harus di upload.");
      // }

      let total_pembayaran = 0;

      // parsing tanggal dengan format YYYY-MM-DD
       let checkinDate = moment(check_in, "YYYY-MM-DD HH:mm");
      let checkoutDate = moment(check_out, "YYYY-MM-DD HH:mm");

      // Validasi check-in dan check-out time
      const checkoutMaxTime = moment(checkoutDate).set({hour: 10, minute: 0});
      const checkinDefaultTime = moment(checkinDate).set({hour: 14, minute: 0});

      if (checkinDate.isBefore(checkinDefaultTime)) {
        checkinDate = checkinDefaultTime;
      }

      if (checkoutDate.isAfter(checkoutMaxTime)) {
        checkoutDate = checkoutMaxTime;
      }

      // menghitung jumlah hari menginap
      let totalDays = checkoutDate.diff(checkinDate, "days");
      if (totalDays <= 0) {
        return res.status(400).send("Waktu check_out harus setelah check-in dan minimal menginap satu malam");
      }
      
      console.log("Total hari menginap: ", totalDays);

      const transaksi = await Transaksi.create({
        id_user, 
        total_pembayaran:0,
        metode_pembayaran, 
        bukti_transaksi: buktitransaksiPath,
      });

      for (const item of items){
        const jenisKamar = await JenisKamar.findByPk(item.id_jeniskamar)
        console.log(jenisKamar);

        if (jenisKamar.stok<item.jumlah_kamar){
          return res.status(400).send(`stok kamar ${jenisKamar.nama} tidak tersedia`)
        }
        const total_harga = jenisKamar.harga * item.jumlah_kamar * totalDays;
        total_pembayaran += total_harga
        console.log("total pembayaran", total_pembayaran);

        // Mendapatkan nomor kamar yang tersedia
        const kamarTersedia = await Kamar.findAll({
          where: {
            id_jeniskamar: item.id_jeniskamar,
            status: 'available', // hanya kamar yang tersedia
          },
          limit: item.jumlah_kamar, // ambil sebanyak jumlah kamar yang dipesan
        });

        if (kamarTersedia.length < item.jumlah_kamar) {
          return res.status(400).send(`Tidak cukup tersedia untuk jenis kamar ${jenisKamar.nama}`);
        }

        // Menyimpan setiap kamar dan memperbarui statusnya menjadi 'booked'
        for (const kamar of kamarTersedia){

        await Dtransaksi.create({
          id_transaksi: transaksi.id,
          id_jeniskamar: jenisKamar.id,
          no_kamar: kamar.no_kamar,
          harga: jenisKamar.harga,
          jumlah_kamar: item.jumlah_kamar,
          jumlah_malam: totalDays,
          check_in: checkinDate.format("YYYY-MM-DD HH:mm"),
          check_out: checkoutDate.format("YYYY-MM-DD HH:mm"),
          total_harga
        });

        //update status kamar menjadi "booked"
        kamar.status = 'booked';
        await kamar.save();
      }

      // Mengurangi stok kamar
        jenisKamar.stok -= item.jumlah_kamar;
        await jenisKamar.save();
      }

      transaksi.total_pembayaran = total_pembayaran
      await transaksi.save();

      res.status(201).json(transaksi)

    }catch(error){
      console.log(error);
      res.status(500).send("internal server error")
    }
      
    };

