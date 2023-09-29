const express = require('express');
const router = express.Router();

const zoo_patronsController = require('../controllers/zoo_patrons');
const validation = require('../middleware/validate');

router.get('/',zoo_patronsController.getAll);

router.get('/:id',zoo_patronsController.getSingle);

router.post('/', validation.saveZoo_patron, zoo_patronsController.createZoo_patron);

router.put('/:id', validation.saveZoo_patron, zoo_patronsController.updateZoo_patron);

router.delete('/:id', zoo_patronsController.deleteZoo_patron);

module.exports = router;