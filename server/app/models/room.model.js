module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("rooms", {
    room: {
      type: Sequelize.STRING
    },
    capacity: {
      type: Sequelize.STRING
    },
    floor: {
      type: Sequelize.STRING
    }
  });

  return Room;
};
