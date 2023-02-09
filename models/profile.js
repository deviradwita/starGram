'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Name is Required.`
        },
        notNull: {
          msg: `Name is Required.`
        }
      } 
     },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Gender is Required.`
        },
        notNull: {
          msg: `Gender is Required.`
        }
      } 
     },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Birth date is Required.`
        },
        notNull: {
          msg: `Birth date is Required.`
        }
      } 
     }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};