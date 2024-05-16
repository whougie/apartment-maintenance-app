const router = require('express').Router();

const accountRoute = require('./account-routes');
const issuesRoute = require('./issues-routes')
const apartmentRoute = require('./apartment-routes')

router.use('/account', accountRoute);
router.use('/issues', issuesRoute);
router.use('/apartment', apartmentRoute);

module.exports = router;