var db = require("../models");
var passport = require("../config/passport");
var userID;

module.exports = function(req, next) {

  if (req.user) {
    userID = req.user.id;
    return userID;
  }
  else {
    return next();
  }
};
module.exports = function (sequelize, DataTypes) {
  var Phonebook = sequelize.define('Phonebook', {
      contact_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      contact_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      phone_number: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      notes: {
          type: DataTypes.STRING,
          allowNull: true
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: userID
      }
  });
  return Phonebook;
};