// db.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('awt_2324_db', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

const Product = sequelize.define('Products', {
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    timestamps: false 
  });

module.exports = { sequelize, Product };
