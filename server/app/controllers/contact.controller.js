const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const splitNameforCreateFirstLastName = (name) => {
    const splittedName = name.split(' ');
    return splittedName;
  }
  const splittedName = splitNameforCreateFirstLastName(req.body.name);

  const contact = {
    firstName: splittedName[0],
    lastName: splittedName[1],
    phone: req.body.phone,
  };

  Contact.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

exports.findAll = (req, res) => {
  const name= req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Contact.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};