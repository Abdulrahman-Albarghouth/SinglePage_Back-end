'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Contact.belongsTo(models.ContactRole, {
        foreignKey: "typeId",
      });
    }
  }
  Contact.init({
    title: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
    paranoid: true,
  });
  return Contact;
};