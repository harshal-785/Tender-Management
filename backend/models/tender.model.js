module.exports = (sequelize, Sequelize) => {
    return sequelize.define('tender', {
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      value: Sequelize.DECIMAL(15,2),
      closing_date: Sequelize.DATE
    });
  };
  