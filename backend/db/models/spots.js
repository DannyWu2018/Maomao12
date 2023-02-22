'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spots.belongsTo(
        models.User,
        { foreignKey: 'ownerId' });//????
        // Spots.hasMany( //add after
        //   models.PreviewImage,
        //   { foreignKey: 'ownerId' }//????
        // );


    }
  }
  Spots.init({

    ownerId: {
      type: DataTypes.INTEGER,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [0, 50],  
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },


    avgRating: {
      type: DataTypes.FLOAT,
    },
    previewImage: {
      type: DataTypes.STRING
    }
  }, 
  
  {
    sequelize,
    modelName: "Spots",
    // defaultScope: {
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"]
    //   }
    // }
  }
  
  );
  return Spots;
};