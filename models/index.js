const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Costumer = require('./costumer')(sequelize, DataTypes);

// Define associations
User.associate({ Level, Costumer });
Level.associate({ User });
Product.associate({ Costumer });
Costumer.associate({ Product, User });

module.exports = { sequelize, User, Level, Product, Costumer };
