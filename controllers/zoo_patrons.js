const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['zoo_patrons']
  const result = await mongodb.getDatabase().db().collection('zoo_patrons').find();
  result.toArray().then((zoo_patrons, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_patrons);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['zoo_patrons']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_patron id to find a zoo_patron.');
  }
  const zoo_patronId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('zoo_patrons').find({ _id: zoo_patronId });
  result.toArray().then((zoo_patrons, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_patrons[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createZoo_patron = async (req, res) => {
  //#swagger.tags=['zoo_patrons']
  const zoo_patron = {
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  const response = await mongodb.getDatabase().db().collection('zoo_patrons').insertOne(zoo_patron);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_patron.');
  }
};

const updateZoo_patron = async (req, res) => {
  //#swagger.tags=['zoo_patrons']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_patron id to update a zoo_patron.');
  }
  const zoo_patronId = new ObjectId(req.params.id);
  const zoo_patron = {
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_patrons')
    .replaceOne({ _id: zoo_patronId }, zoo_patron);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_patron.');
  }
};

const deleteZoo_patron = async (req, res) => {
  //#swagger.tags=['zoo_patrons']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_patron id to delete a zoo_patron.');
  }
  const zoo_patronId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_patrons')
    .deleteOne({ _id: zoo_patronId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the zoo_patron.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createZoo_patron,
  updateZoo_patron,
  deleteZoo_patron
};