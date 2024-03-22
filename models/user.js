'use strict';
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
    }
  }
  User.init({
    id:{
     type: DataTypes.INTEGER,
     allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type:  DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      type:  DataTypes.DATE
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    // modelName: 'User',
    // sequelize,
    modelName: 'User',
    tableName: "users",
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true, //use for soft delete with using deleted_at
    underscored: true
  });
  return User;
};