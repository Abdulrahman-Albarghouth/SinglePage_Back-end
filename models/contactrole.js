'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContactRole.hasMany(models.Contact, {
        foreignKey: "typeId",
      });
    }
  }
  ContactRole.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContactRole',
    paranoid: true,
  });
  return ContactRole;
};