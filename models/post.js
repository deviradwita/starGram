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
    UserId: DataTypes.INTEGER ,
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
      type: DataTypes.TEXT,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Content is Required.`
        },
        notNull: {
          msg: `Content is Required.`
        }
      } 
     },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Image is Required.`
        },
        notNull: {
          msg: `Image is Required.`
        }
      } 
     },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `TagId is Required.`
        },
        notNull: {
          msg: `TagId is Required.`
        }
      } 
     }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};