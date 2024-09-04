const { dtransaksi } = require(".");

module.exports = (sequelize, DataTypes) => {

    const dtransaksi = sequelize.define("dtransaksi", {
          id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
          },  
  
         id_transaksi: {
            type: DataTypes.STRING(50),
            allowNull: true
          },
  
          id_jeniskamar: {
            autoIncrement: false,
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: false
          },

          no_kamar: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
          },

          jumlah_kamar: {
            type: DataTypes.INTEGER,
            allowNull: true
          },

          jumlah_malam: {
            type: DataTypes.STRING(50),
            allowNull: true
          },

          harga: {
            type: DataTypes.INTEGER,
            allowNull: true
          },

          check_in: {
            autoIncrement: false,
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: false
          },

          check_out: {
            autoIncrement: false,
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: false
          },

         total_harga: {
            autoIncrement: false,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
          },
           
  
    }, {
  
      sequelize,
      tableName: 'dtransaksi',
      timestamps: true,
      indexes: [
  
        {
  
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  
    return dtransaksi;
  };