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
      User.hasMany(models.Address, {
        foreignKey: "userId",
      });
      User.hasMany(models.Contact, {
        foreignKey: "userId",
      });
      User.hasMany(models.Education, {
        foreignKey: "userId",
      });
      User.hasMany(models.Message, {
        foreignKey: "userId",
      });
      User.hasMany(models.Portfolio, {
        foreignKey: "userId",
      });
      User.hasMany(models.Service, {
        foreignKey: "userId",
      });
      User.hasMany(models.Skill, {
        foreignKey: "userId",
      });
      User.hasMany(models.Work, {
        foreignKey: "userId",
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    skillsTitle: DataTypes.STRING,
    avatar: DataTypes.STRING,
    banar: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    job: DataTypes.STRING,
    cv: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};