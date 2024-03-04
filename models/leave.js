'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leave.init({
    date: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    day:{
    type : DataTypes.STRING,
    allowNull:false,
    },
    duration: { 
      type :DataTypes.STRING,
      allowNull:false,
    },
    reason:{
      type : DataTypes.STRING,
      allowNull:false
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updated_at: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  deleted_at: {
    allowNull: true,
    type: DataTypes.DATE,
  },
},
   {
    sequelize,
    modelName: 'Leave',
    tableName: "leaves",
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true,
  });
  return Leave;
};