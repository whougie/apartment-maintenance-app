const router = require('express').Router();

const accountRoute = require('./account-routes');
const issuesRoute = require('./issues-routes')
const apartmentRoute = require('./apartment-routes')
const handymanRoute = require('./handyman-routes')

router.use('/account', accountRoute);
router.use('/issue', issuesRoute);
router.use('/apartment', apartmentRoute);
router.use('/handyman', handymanRoute);

module.exports = router;