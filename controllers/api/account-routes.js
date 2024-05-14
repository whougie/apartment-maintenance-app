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

function getHandyMan() {
  const table = [
    { weight: 1, id: "item1" }, // Element 1
    { weight: 1, id: "item2" }, // Element 2
    { weight: 4, id: "item3" }, // Element with a 4 times likelihood
    { weight: 2, id: "item4" }, // Element 4
    { weight: 2, id: "item5" },
  ];
  const choosenItem = rwc(table);
  const choosenUnlikely = rwc(table, 100); // The last shall be first
  const choosenDeterministically = rwc(table, 0);
console.log (table)
}

/*const rwc = require("random-weighted-choice");
const table = [
  { weight: 1, id: "item1" }, // Element 1
  { weight: 1, id: "item2" }, // Element 2
  { weight: 4, id: "item3" }, // Element with a 4 times likelihood
  { weight: 2, id: "item4" }, // Element 4
  { weight: 2, id: "item5" },
];
const choosenItem = rwc(table);
const choosenUnlikely = rwc(table, 100); // The last shall be first
const choosenDeterministically = rwc(table, 0);*/
module.exports = router;