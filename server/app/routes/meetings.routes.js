module.exports = app => {
  const meetings = require("../controllers/meeting.controller.js");

  var router = require("express").Router();

  // Create a new meetings
  router.post("/", meetings.create);

  // Retrieve all meetings
  router.get("/", meetings.findAll);

  // Retrieve all published meetings
  router.get("/published", meetings.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", meetings.findOne);

  // Update a Tutorial with id
  router.put("/:id", meetings.update);

  // Delete a Tutorial with id
  router.delete("/:id", meetings.delete);

  // Delete all meetings
  router.delete("/", meetings.deleteAll);

  app.use('/api/meetings', router);
};
