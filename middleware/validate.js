const validator = require('../helpers/validate');

const saveZoo_animal = (req, res, next) => {
  const validationRule = {
    species: 'required|string',
    name: 'required|string',
    idNumber: 'required|string',
    enclosure: 'required|string',
    age: 'required|string',
    caretaker: 'required|string',
    gender: 'required|string'

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveZoo_patron = (req, res, next) => {
  const validationRule = {
    idNumber: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveZoo_animal,
  saveZoo_patron
};