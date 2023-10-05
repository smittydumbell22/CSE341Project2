const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['zoo_shops']
  const result = await mongodb.getDatabase().db().collection('zoo_shops').find();
  result.toArray().then((zoo_shops, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_shops);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['zoo_shops']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_shop id to find a zoo_shop.');
  }
  const zoo_shopId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('zoo_shops').find({ _id: zoo_shopId });
  result.toArray().then((zoo_shops, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(zoo_shops[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createZoo_shop = async (req, res) => {
  //#swagger.tags=['zoo_shops']
  const zoo_shop = {
    idNumber: req.body.species,
    name: req.body.name,
    location: req.body.idNumber
  };
  const response = await mongodb.getDatabase().db().collection('zoo_shops').insertOne(zoo_shop);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_shop.');
  }
};

const updateZoo_shop = async (req, res) => {
  //#swagger.tags=['zoo_shop']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_shop id to update a zoo_shop.');
  }
  const zoo_shopId = new ObjectId(req.params.id);
  const zoo_shop = {
    idNumber: req.body.idNumber,
    name: req.body.name,
    location: req.body.location
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_shops')
    .replaceOne({ _id: zoo_shopId }, zoo_shop);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the zoo_shop.');
  }
};

const deleteZoo_shop = async (req, res) => {
  //#swagger.tags=['zoo_shops']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid zoo_shop id to delete a zoo_shop.');
  }
  const zoo_shopId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('zoo_shops')
    .deleteOne({ _id: zoo_shopId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the zoo_shop.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createZoo_shop,
  updateZoo_shop,
  deleteZoo_shop
};



