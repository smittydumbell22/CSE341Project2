const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Cassie Smith']
    res.send('Cassie Smith');
});

router.use('/zoo_animals', require('./zoo_animals'));
router.use('/zoo_patrons', require('./zoo_patrons'));

module.exports = router;