module.exports = (sequelize, DataTypes) => {

    const transaksi = sequelize.define("transaksi", {
        id: {
           autoIncrement: true,
           type: DataTypes.BIGINT,
           allowNull: false,
           primaryKey: true
         },  
      
         id_user: {
          type: DataTypes.STRING(50),
          allowNull: true
        },

          total_pembayaran: {
            autoIncrement: false,
            type: DataTypes.FLOAT,
            allowNull: false,
            primaryKey: false
          },

          metode_pembayaran: {
            autoIncrement: false,
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: false
          },

          bukti_transaksi: {
            type: DataTypes.STRING,
            allowNull: true
          },

    }, {

      sequelize,
      tableName: 'transaksi',
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

    return transaksi;
  }; 