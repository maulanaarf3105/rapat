module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    nohp: {
      type: Sequelize.STRING
    },
    unit: {
      type: Sequelize.STRING
    }
  });

  return User;
};
