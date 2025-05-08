module.exports = (sequelize, Sequelize) => {
    return sequelize.define('status', {
      name: Sequelize.STRING
    });
  };