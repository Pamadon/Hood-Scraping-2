'use strict';
module.exports = function(sequelize, DataTypes) {
  var area = sequelize.define('area', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return area;
};