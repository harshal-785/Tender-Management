module.exports = (sequelize, Sequelize) => {
    return sequelize.define('country', {
      name: Sequelize.STRING
    });
  };