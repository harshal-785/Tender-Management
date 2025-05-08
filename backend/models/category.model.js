module.exports = (sequelize, Sequelize) => {
    return sequelize.define('category', {
      name: Sequelize.STRING
    });
  };
  