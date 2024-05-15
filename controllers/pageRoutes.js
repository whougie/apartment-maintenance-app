const router = require('express').Router();

///
// Routes to retrieve HTML pages
///
router.get('/', (req, res) => {

  
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

router.get('/issue', (req, res) => {
  // TODO: go to the issues page once it exists
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