module.exports = (sequelize, Sequelize) => {
  const Meeting = sequelize.define("meetings", {
    title: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.STRING
    },
    end: {
      type: Sequelize.STRING
    },
    room: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Meeting;
};
