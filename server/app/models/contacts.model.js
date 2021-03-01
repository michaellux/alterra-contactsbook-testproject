module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return Contact;
};