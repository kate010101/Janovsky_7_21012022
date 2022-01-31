//var mysql = require("mysql");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          //name: 'userId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      });
    }
  };
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
}; 