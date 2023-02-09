'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `UserName is Required.`
        },
        notNull: {
          msg: `UserName is Required.`
        }
      } 
     },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Email is Required.`
        },
        notNull: {
          msg: `Email is Required.`
        }
      } 
     },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Password is Required.`
        },
        notNull: {
          msg: `Password is Required.`
        }
      } 
     },
    role: DataTypes.STRING,
     profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((User, options)=>{
    User.role = 'User'
  })

  User.beforeCreate((User, options)=>{
    if(!User.profilePicture){
      User.profilePicture = "https://tinyurl.com/2fw6u9kh"
     }
  })

  User.beforeCreate((User, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(User.password, salt);

    User.password = hash;
  })
  
  return User; 
};