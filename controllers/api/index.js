const router = require('express').Router();

const accountRoute = require('./account-routes');
const issuesRoute = require('./issues-routes')

router.use('/account', accountRoute);
router.use('/issues', issuesRoute);

module.exports = router;