const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['zoo_animals']
  const result = await mongodb.getDatabase().db().collection('zoo_animals').find();
  result.toArray().then((zoo_animals, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_animals);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['zoo_animals']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_animal id to find a zoo_animal.');
  }
  const zoo_animalId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('zoo_animals').find({ _id: zoo_animalId });
  result.toArray().then((zoo_animals, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_animals[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createZoo_animal = async (req, res) => {
  //#swagger.tags=['zoo_animals']
  const zoo_animal = {
    species: req.body.species,
    name: req.body.name,
    idNumber: req.body.idNumber,
    enclosure: req.body.enclosure,
    age: req.body.age,
    caretaker: req.body.caretaker,
    gender: req.body.gender
  };
  const response = await mongodb.getDatabase().db().collection('zoo_animals').insertOne(zoo_animal);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_animal.');
  }
};

const updateZoo_animal = async (req, res) => {
  //#swagger.tags=['zoo_animals']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a zoo_animal.');
  }
  const zoo_animalId = new ObjectId(req.params.id);
  const zoo_animal = {
    species: req.body.species,
    name: req.body.name,
    idNumber: req.body.idNumber,
    enclosure: req.body.enclosure,
    age: req.body.age,
    caretaker: req.body.caretaker,
    gender: req.body.gender
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_animals')
    .replaceOne({ _id: zoo_animalId }, zoo_animal);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_animal.');
  }
};

const deleteZoo_animal = async (req, res) => {
  //#swagger.tags=['zoo_animals']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a zoo_animal.');
  }
  const zoo_animalId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_animals')
    .deleteOne({ _id: zoo_animalId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the zoo_animal.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createZoo_animal,
  updateZoo_animal,
  deleteZoo_animal
};



