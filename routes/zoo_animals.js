const express = require('express');
const router = express.Router();

const zoo_animalsController = require('../controllers/zoo_animals');

const validation = require('../middleware/validate');
router.get('/',zoo_animalsController.getAll);

router.get('/:id',zoo_animalsController.getSingle);

router.post('/', validation.saveZoo_animal, zoo_animalsController.createZoo_animal);

router.put('/:id', validation.saveZoo_animal, zoo_animalsController.updateZoo_animal);

router.delete('/:id', zoo_animalsController.deleteZoo_animal);

module.exports = router;