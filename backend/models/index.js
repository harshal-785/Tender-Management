const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.tender = require('./tender.model')(sequelize, Sequelize);
db.category = require('./category.model')(sequelize, Sequelize);
db.country = require('./country.model')(sequelize, Sequelize);
db.industry = require('./industry.model')(sequelize, Sequelize);
db.status = require('./status.model')(sequelize, Sequelize);

// Associations
db.tender.belongsTo(db.user);
db.tender.belongsTo(db.category);
db.tender.belongsTo(db.country);
db.tender.belongsTo(db.industry);
db.tender.belongsTo(db.status);

module.exports = db;
