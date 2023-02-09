'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsTo(models.Tag)
    }
  }
  Post.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `UserId is Required.`
        },
        notNull: {
          msg: `UserId is Required.`
        }
      } 
     },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Title is Required.`
        },
        notNull: {
          msg: `Title is Required.`
        }
      } 
     },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `c is Required.`
        },
        notNull: {
          msg: `Title is Required.`
        }
      } 
     },
    imgUrl: DataTypes.STRING,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};