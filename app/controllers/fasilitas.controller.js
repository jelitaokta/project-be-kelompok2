const db = require("../models");
const path = require("path");
const multer = require("multer");
const fasilitas = db.fasilitas;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resources/static/assets/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk nama file unik
  },
});

const upload = multer({ storage: storage }).single("file");

// untuk tambah data
exports.create = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(`Error when trying to upload images: ${err}`);
    }

    if (!req.file) {
      return res.status(400).send(`You must select a file.`);
    }

  // const data_fasilitas = {
  //   elemenData: req.body.elemenData,
  //   id_fasilitas: req.body.id_fasilitas,
  //   fasilitas: req.body.fasilitas,
  //   deskripsi: req.body.deskripsi,
  //   name: req.file.originalname,
  //   path: req.file.path,
  //   type: req.file.mimetype,
  // };
  // console.log("data_", data_fasilitas);
  fasilitas .create({
    id_fasilitas: req.body.id_fasilitas,
    fasilitas: req.body.fasilitas,
    deskripsi: req.body.deskripsi,
    name: req.file.originalname,
    path: req.file.path,
    type: req.file.mimetype,
  }) //menyimpan data_peserta ke table peserta
    .then((data) => {
      res.send({
        message: "Data was insert successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating data.",
      });
    });
  });
};

// untuk menampilkan semua data
exports.readAll = async (req, res) => {
  await fasilitas
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// untuk menampilkan data dengan id tertentu
exports.readById = async (req, res) => {
  const id = req.params.id;
  await fasilitas
    .findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// untuk update data
exports.update = async (req, res) => {
  const id = req.params.id;
  await fasilitas
    .update(req.body, { where: { id: id } })
    .then((num) => {
      num == 1
        ? res.send({
            message: "Data was updated successfully.",
          })
        : res.send({
            message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`,
          });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Data with id=${id}`,
        error: err,
      });
    });
};

// untuk menghapus data
exports.delete = async (req, res) => {
  const id = req.params.id;
  await fasilitas
    .destroy({
      where: {
        id: id,
      },
    })
    .then((num) => {
      num == 1
        ? res.send({
            message: "Data was deleted successfully.",
          })
        : res.send({
            message: `Cannot delete Data with id=${id}. Maybe Data was not found or req.body is empty!`,
          });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Data with id=${id}`,
        error: err,
      });
    });
};
