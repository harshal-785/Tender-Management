module.exports = (sequelize, Sequelize) => {
    return sequelize.define('industry', {
      name: Sequelize.STRING
    });
  };
  