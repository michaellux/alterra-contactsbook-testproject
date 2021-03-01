module.exports = app => {
  const contacts = require("../controllers/contact.controller.js");

  var router = require("express").Router();

  router.post("/", contacts.create);

  router.get("/", contacts.findAll);

  router.get("/:id", contacts.findOne);

  router.delete("/:id", contacts.delete);

  app.use('/api/contacts', router);
};