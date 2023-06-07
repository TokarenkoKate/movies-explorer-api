const router = require('express').Router();

const { handleInvalidRoute } = require('../controllers/invalidRoutes');

router.all('*', handleInvalidRoute);

module.exports = router;
