'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
     
      models.Post.hasMany(models.Comment);

    }
  };
  Post.init({
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
}; 