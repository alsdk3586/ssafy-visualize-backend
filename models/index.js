
const Sequelize = require('sequelize');
const Sensing1 = require('./sensing1');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.sensing1=Sensing1;
Sensing1.init(sequelize);

module.exports = db;
