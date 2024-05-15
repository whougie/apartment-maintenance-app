const router = require('express').Router()
const { Tenant, Manager, Apartment, Issues, Handyman,  } = require("../../models");
const bcrypt = require("bcrypt");

////
// Routes to retrieve from the DB or save data to it and returns a response with JSON
////
router.get("/", async (req, res) => {
  try {
    const tenantData = await Tenant.findAll({
      include: [{ model: Apartment }],
    })
    console.log(tenantData)
    res.status(200).json(tenantData);
    
  } catch(err){ 
    console.log(err)
    res.status(400).json( err )
  }
})

router.get("/:id", async (req, res) => {
  try {
    const result = await Tenant.findByPk(req.params.id)
    res.status(200).json(result);
  } catch(err){
    console.log(err)
    res.status(400).json( err )
  }
})
router.post("/login", async (req, res) => {
  let emailCheck

  try {
    emailCheck = await Tenant.findOne({
      where: {
        email: req.body.email
      }
    })
  } catch(err){
    res.status(400).json({ status: "error" })
  }

  if( !emailCheck ){
    return res.status(401).json({ status: "error" })
  }

  // if we are this far, then the email matched
  const hashedPassword = emailCheck.password

  // time to verify the hashed password 
  const verified = await bcrypt.compare(req.body.password, hashedPassword)

  if( verified ){
    res.status(200).json({ status: "success" })
  } else {
    res.status(401).json({ status: "error" })
  }

})


router.post("/", async (req, res) => {
  try {
    const result = await Tenant.create(req.body)
    res.json({ status: "success", payload: result })
  } catch(err){
    res.status(400).json({ status: "error" })
  }
})



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

router.get('/issue/:id', async (req, res) => {
  // TODO need to create get all the issues in respect to request from the  DB
  console.log(req.body);
  try {
    Issue.findByPk(req.params.id, {
      include: [Apartment, Manager, Tenant]
    })
    res.json({status: "Got the GET issue with ID successfully"});
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