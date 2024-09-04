const db = require("../models");
const Kamar = db.kamar;
const JenisKamar = db.JenisKamar;

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { id_jeniskamar, no_kamar, status } = req.body;

    // membuat data kamar baru
    const newKamar = await Kamar.create({
      id_jeniskamar,
      no_kamar,
      status,
    });

    // Mencari kamar berdasarkan ID
    const jenisKamarInstance = await JenisKamar.findByPk(id_jeniskamar);
    console.log("JenisKamar Instance: ", jenisKamarInstance);

    if (jenisKamarInstance) {
      // jika jenis kamar ditemukan, tambahkan stok
      jenisKamarInstance.stok += 1;
      await jenisKamarInstance.save();
    } else {
      return res.status(404).send({ message: "Jenis kamar tidak ditemukan" });
    }

    res.status(201).send(newKamar); //mengirim respon berhasil
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// untuk memperbarui data kamar
exports.update = async (req, res) => {
  try {
    const { id_jeniskamar, status } = req.body;

    // Cari data kamar berdasarkan ID dari parameter
    const kamar = await Kamar.findOne({ where: { id: req.params.id } });
    if (!kamar) {
      return res.status(404).send({ message: "Kamar tidak ditemukan" });
    }

    // cari jenis kamar berdasarkan ID
    const jenisKamar = await JenisKamar.findByPk(id_jeniskamar);
    if (!jenisKamar) {
      return res.status(404).send({ message: "Jenis kamar tidak ditemukan" });
    }

    // Update stok hanya jika status kamar berubah
    if (kamar.status !== status) {
      if (status === "service" && kamar.status !== "service") {
        // Jika status berubah menjadi "service", kurangi stok
        jenisKamar.stok -= 1;
      } else if (status !== "service" && kamar.status === "service") {
        // Jika status berubah dari 'service' menjadi status lain, tambahkan stok
        jenisKamar.stok += 1;
      }

      // Simpan perubahan stok jika ada
      await jenisKamar.save();
    }

    //  Update status kamar
    kamar.status = status;
    await kamar.save();

    res.status(200).send(kamar);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
