const router = require('express').Router();
const { Issue } = require("../models")
///
// Routes to retrieve HTML pages
///
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
  const issueData = await Issue.findAll({ where: { tenant_id: req.session.userId } })
  const issues = issueData.map(issue => issue.get({ plain: true }))
  console.log('14',issues)
  console.log('15',req.session.userId)
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      issues
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

router.get('/issue', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    res.render('issue', {
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;