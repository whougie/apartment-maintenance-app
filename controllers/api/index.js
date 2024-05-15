const router = require('express').Router();

const accountRoute = require('./account-routes');

router.use('/account', accountRoute);

module.exports = router;