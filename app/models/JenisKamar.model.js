module.exports = (sequelize, DataTypes) => {

    const JenisKamar = sequelize.define("JenisKamar", {
          id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
          },  

        jenis: {
            type: DataTypes.STRING(50),
            allowNull: true
          },

          type: {
            type: DataTypes.STRING,
          },
          name: {
            type: DataTypes.STRING,
          },

          harga: {
            type: DataTypes.INTEGER,
            allowNull: true
          },

          status: {
            type: DataTypes.STRING(50),
            allowNull: true
          },

          stok: {
            type: DataTypes.INTEGER,
            allowNull: true
          },


    }, {

      sequelize,
      tableName: 'JenisKamar',
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

    return JenisKamar;
  }; 