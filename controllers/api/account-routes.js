const router = require('express').Router()

////
// Routes to retrieve from the DB or save data to it and returns a response with JSON
////

router.post('/', async (req, res) => {
  console.log(req.body); // TODO: Temporary outputting the request from the form of a new account being created until more of the project is completed, which will save the account information of user to DB
  try {
    res.json({status: "Great and POST account successfully created"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
})

router.post('/login', async (req, res) => {
  // TODO need to check to see if password for the username is correct
  console.log(req.body);
  try {
    res.json({status: "Got the POST Login successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
})

router.put('/', async (req, res) => {
  // TODO need make change to the db to update account appt changes
  console.log(req.body);
  try {
    res.json({status: "Got the PUT Login successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: Failed, payload: error.message})
  }
})


router.post('/issue', async (req, res) => {
  // TODO need to create a new issue and save in DB
  console.log(req.body);
  try {
    res.json({status: "Got the POST issue successfully"});
  } catch (error) {
    res.status(500).json({status: Failed, payload: error.message})
  }
})

router.get('/issues', async (req, res) => {
  // TODO need to create get all the issues in respect to request from the  DB
  console.log(req.body);
  try {
    res.json({status: "Got the GET issues successfully"});
  } catch (error) {
    res.status(500).json({status: Failed, payload: error.message})
  }
})

module.exports = router;