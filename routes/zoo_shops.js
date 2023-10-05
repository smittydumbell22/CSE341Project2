const express = require('express');
const router = express.Router();

const zoo_shopsController = require('../controllers/zoo_shops');
const validation = require('../middleware/validate');

router.get('/:id', zoo_shopsController.getSingle);

router.post('/', validation.saveZoo_shop, zoo_shopsController.createZoo_shop);

router.put('/:id', validation.saveZoo_shop, zoo_shopsController.updateZoo_shop);

router.delete('/:id', zoo_shopsController.deleteZoo_shop); 

module.exports = router;