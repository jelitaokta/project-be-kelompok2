module.exports = (sequelize, DataTypes) => {

  const fasilitas = sequelize.define("fasilitas", {
        id_fasilitas: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },  

       fasilitas: {
          type: DataTypes.STRING(50),
          allowNull: true
        },

        deskripsi: {
          autoIncrement: false,
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: false
        },

        type: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
        },


  }, {

    sequelize,
    tableName: 'fasilitas',
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

  return fasilitas;
};