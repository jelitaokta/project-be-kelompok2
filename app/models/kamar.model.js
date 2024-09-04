module.exports = (sequelize, DataTypes) => {

    const kamar = sequelize.define("kamar", {
          id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
          },  

         id_jeniskamar: {
            type: DataTypes.STRING(50),
            allowNull: true
          },

          no_kamar: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
          },

          status: {
            type: DataTypes.STRING(50),
            allowNull: true
          },

    }, {

      sequelize,
      tableName: 'kamar',
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

    return kamar;
  }; 