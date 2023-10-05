const express = require('express');
const router = express.Router();

const zoo_employeesController = require('../controllers/zoo_employees');

const validation = require('../middleware/validate');
router.get('/:id', zoo_employeesController.getSingle);

router.post('/', validation.saveZoo_employee, zoo_employeesController.createZoo_employee);

router.put('/:id', validation.saveZoo_employee, zoo_employeesController.updateZoo_employee);

router.delete('/:id', zoo_employeesController.deleteZoo_employee); 

module.exports = router;