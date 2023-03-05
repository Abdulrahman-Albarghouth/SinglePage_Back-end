'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Portfolio.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Portfolio.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
    paranoid: true,
  });
  return Portfolio;
};