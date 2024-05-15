const router = require('express').Router();

///
// Routes to retrieve HTML pages
///
router.get('/', (req, res) => {
  // TODO: go to the home page once it exist
  // Temp output
  try {
    res.json({status: "Great and GET Homepage successful"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
});

router.get('/issue', (req, res) => {
  // TODO: go to the issues page once it exists
  try {
    res.json({status: "Got the GET issue successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
});

router.get('/login', (req, res) => {
  // TODO redirect to the login page
  try {
    res.json({status: "Got the GET Login successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
});


module.exports = router;