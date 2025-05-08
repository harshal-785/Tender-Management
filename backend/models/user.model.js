module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
      name: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING
    });
  };