const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['zoo_employees']
  const result = await mongodb.getDatabase().db().collection('zoo_employees').find();
  result.toArray().then((zoo_employees, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_employees);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['zoo_employees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_employee id to find a zoo_employee.');
  }
  const zoo_employeeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('zoo_employees').find({ _id: zoo_employeeId });
  result.toArray().then((zoo_employees, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_employees[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createZoo_employee = async (req, res) => {
  //#swagger.tags=['zoo_employees']
  const zoo_employee = {
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  const response = await mongodb.getDatabase().db().collection('zoo_employees').insertOne(zoo_employee);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_employee.');
  }
};

const updateZoo_employee = async (req, res) => {
  //#swagger.tags=['zoo_employees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_employee id to update a zoo_employee.');
  }
  const zoo_employeeId = new ObjectId(req.params.id);
  const zoo_employee = {
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_employees')
    .replaceOne({ _id: zoo_employeeId }, zoo_employee);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_employee.');
  }
};

const deleteZoo_employee = async (req, res) => {
  //#swagger.tags=['zoo_employees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_employee id to delete a zoo_employee.');
  }
  const zoo_employeeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_employees')
    .deleteOne({ _id: zoo_employeeId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the zoo_employee.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createZoo_employee,
  updateZoo_employee,
  deleteZoo_employee
};