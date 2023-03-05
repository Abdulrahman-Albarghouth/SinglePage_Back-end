'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Work.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Work.init({
    location: DataTypes.STRING,
    startingDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Work',
    paranoid: true,
  });
  return Work;
};