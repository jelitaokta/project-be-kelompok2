//mulai kembali dari index models
const dbConfig = require("../config/project.db.js");
const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
// });

//Coding Pak Septian
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
});

// membuat module
const db = {};

// sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model
db.user = require("./user.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.fasilitas = require("./fasilitas.model.js")(sequelize, Sequelize);
db.JenisKamar = require("./JenisKamar.model.js")(sequelize, Sequelize);
db.kamar = require("./kamar.model.js")(sequelize, Sequelize);
db.transaksi = require("./transaksi.model.js")(sequelize, Sequelize);
db.dtransaksi = require("./DetailTransaksi.model.js")(sequelize, Sequelize);
db.moment = require("./moment.model.js")(sequelize, Sequelize);

module.exports = db;
