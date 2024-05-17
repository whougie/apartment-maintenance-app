const router = require('express').Router()
const { Tenant, Manager, Apartment, Issue, Handyman,  } = require("../../models");
const bcrypt = require("bcrypt");
const rwc = require("random-weighted-choice");
////
// Routes to retrieve from the DB or save data to it and returns a response with JSON
////
router.get("/tenant", async (req, res) => {
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

router.get("/tenant/:id", async (req, res) => {
  try {
    const result = await Tenant.findByPk(req.params.id)
    res.status(200).json(result);
  } catch(err){
    console.log(err)
    res.status(400).json( err )
  }
})
router.post("/tenant/login", async (req, res) => {
  let emailCheck
  
  try {
    emailCheck = await Tenant.findOne({
      where: {
        tenant_email: req.body.tenant_email
      }
    })
  } catch(err){
    res.status(400).json({ status: "error" })
  }
  
  if( !emailCheck ){
    return res.status(401).json({ status: "error" })
  }
  
  // if we are this far, then the email matched
  const hashedPassword = emailCheck.tenant_password
  
  // time to verify the hashed password 
  const verified = await bcrypt.compare(req.body.tenant_password, hashedPassword)
  
  if( verified ){
    res.status(200).json({ status: "success" })
  } else {
    res.status(401).json({ status: "error" })
  }
  
})


router.post("/tenant", async (req, res) => {
  try {
    const result = await Tenant.create(req.body)
    res.json({ status: "success", payload: result })
  } catch(err){
    res.status(400).json({ status: "error" })
  }
})


router.get("/manager", async (req, res) => {
  try {
    const managerData = await Manager.findAll({
      
    })
    console.log(managerData)
    res.status(200).json(managerData);
    
  } catch(err){ 
    console.log(err)
    res.status(400).json( err )
  }
})

router.get("/manager/:id", async (req, res) => {
  try {
    const result = await Manager.findByPk(req.params.id)
    res.status(200).json(result);
  } catch(err){
    console.log(err)
    res.status(400).json( err )
  }
})
router.post("/manager/login", async (req, res) => {
  let emailCheck
  
  try {
    emailCheck = await Manager.findOne({
      where: {
        manager_email: req.body.manager_email
      }
    })
  } catch(err){
    res.status(400).json({ status: "error" })
  }
  
  if( !emailCheck ){
    return res.status(401).json({ status: "error", msg: 'incorrect email'})
  }
  
  // if we are this far, then the email matched
  const hashedPassword = emailCheck.manager_password
  
  // time to verify the hashed password 
  const verified = await bcrypt.compare(req.body.manager_password, hashedPassword)
  
  if( verified ){
    res.status(200).json({ status: "success" })
  } else {
    res.status(401).json({ status: "error", msg: 'incorrect password' })
  }
  
})


router.post("/manager", async (req, res) => {
  try {
    const result = await Manager.create(req.body)
    res.json({ status: "success", payload: result })
  } catch(err){
    res.status(400).json({ status: "error" })
  }
})


// router.post('/', async (req, res) => {
//   console.log(req.body); // TODO: Temporary outputting the request from the form of a new account being created until more of the project is completed, which will save the account information of user to DB
//   try {
//     res.json({status: "Great and POST account successfully created"});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })

// router.post('/login', async (req, res) => {
//   // TODO need to check to see if password for the username is correct
//   console.log(req.body);
//   try {
//     res.json({status: "Got the POST Login successfully"});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })

// router.put('/', async (req, res) => {
//   // TODO need make change to the db to update account appt changes
//   console.log(req.body);
//   try {
//     res.json({status: "Got the PUT Login successfully"});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })


// router.post('/issue', async (req, res) => {
//   // TODO need to create a new issue and save in DB
//   console.log(req.body);
//   try {
//     res.json({status: "Got the POST issue successfully"});
//   } catch (error) {
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })

// router.get('/issue/:id', async (req, res) => {
//   // TODO need to create get all the issues in respect to request from the  DB
//   console.log(req.body);
//   try {
//     const issuesData = await Issue.findByPk(req.params.id, {
//       include: [Manager, Tenant, Handyman]
//     })
//     res.json(issuesData);
//   } catch (error) {
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })


// router.get('/issues', async (req, res) => {
//   // TODO need to create get all the issues in respect to request from the  DB
//   console.log(req.body);
//   try {
//     res.json({status: "Got the GET issues successfully"});
//   } catch (error) {
//     res.status(500).json({status: Failed, payload: error.message})
//   }
// })

// Create a variable counter for each handyman

// Once you have the counter, keep track of how many issues each handyman has
//To get the counter of issues, you'll have to loop through the issues array and check which handyman is assigned to it

//Once you have the counters for how many issus each handyman has, you can determine what the the weight should be for that handyman.  Ex. If (issues <25% && issues > 50) then set weight to 2,
// If (issues <0%% && issues > 25%) then set weight to 4

async function getHandyMan() {
  try {
    // Retrieve issue data from the database
    const issueData = await Issue.findAll({
      include: [Tenant, Manager, Handyman],
    });
    // Map the issue data to plain objects
    let issues = issueData.map((issue) => issue.get({ plain: true }));
    console.log(issues);
    
    issues = [
      {
        id: 1,
        tenant_id: 1,
        room: 'Kitchen',
        issue: 'Oven on fire',
        date_scheduled: 'AsAP',
        manager_id: 1,
        handyman_id: null,
        createdAt: "2024-05-16T15:50:21.260Z",
        updatedAt: "2024-05-16T15:50:21.260Z",
        tenant: {
          id: 1,
          tenant_name: 'Gary',
          tenant_email: 'email@gmail.com',
          tenant_password: 'tenant',
          apt_id: 1,
          createdAt: "2024-05-16T15:50:21.244Z",
          updatedAt: "2024-05-16T15:50:21.244Z"
        },
        manager: {
          id: 1,
          manager_name: 'Ozge',
          manager_email: 'email@gmail.com',
          manager_password: 'manager',
          createdAt: "2024-05-16T15:50:21.254Z",
          updatedAt: "2024-05-16T15:50:21.254Z"
        },
        handyman: {
          id: 1,
          name: "kee",
          type: 'doesItALL'
        }
      },
      {
        id: 2,
        tenant_id: 2,
        room: 'Bathroom',
        issue: 'Toilet on fire',
        date_scheduled: 'AsAP',
        manager_id: 2,
        handyman_id: null,
        createdAt: "2024-05-16T15:50:21.260Z",
        updatedAt: "2024-05-16T15:50:21.260Z",
        tenant: {
          id: 2,
          tenant_name: 'Katy',
          tenant_email: 'sample@gmail.com',
          tenant_password: 'tenant',
          apt_id: 2,
          createdAt: "2024-05-16T15:50:21.244Z",
          updatedAt: "2024-05-16T15:50:21.244Z"
        },
        manager: {
          id: 2,
          manager_name: 'Amy',
          manager_email: 'sample@gmail.com',
          manager_password: 'manager',
          createdAt: "2024-05-16T15:50:21.254Z",
          updatedAt: "2024-05-16T15:50:21.254Z"
        },
        handyman: {
          id: 1,
          name: "kee",
          type: 'doesItALL'
        }
      },
      {
        id: 3,
        tenant_id: 3,
        room: 'Bedroom',
        issue: 'TV on fire',
        date_scheduled: 'AsAP',
        manager_id: 3,
        handyman_id: null,
        createdAt: "2024-05-16T15:50:21.260Z",
        updatedAt: "2024-05-16T15:50:21.260Z",
        tenant: {
          id: 3,
          tenant_name: 'Maggie',
          tenant_email: 'email@gmail.com',
          tenant_password: 'tenant',
          apt_id: 3,
          createdAt: "2024-05-16T15:50:21.244Z",
          updatedAt: "2024-05-16T15:50:21.244Z"
        },
        manager: {
          id: 3,
          manager_name: 'Whougie',
          manager_email: 'email@gmail.com',
          manager_password: 'manager',
          createdAt: "2024-05-16T15:50:21.254Z",
          updatedAt: "2024-05-16T15:50:21.254Z"
        },
        handyman: null
      }
    ]
    
    // Create counters for each handyman
    // This data from the handyman table
    const handymanData = await Handyman.findAll({});
    // console.log(handymanData);
    
    const handymanCounters = [
      {id: 0, ctr: 0},
      {id: 1, ctr: 0},
      {id: 2, ctr: 0},
    ];
    
    // Loop through issues array and increment counters for each handyman
    // issues.forEach((issue) => {
    //   handymanCounters[issue.handyman.id].ctr++;
    // });
    
    // Determine weight for each handyman based on the counter
    const table = handymanCounters.map(handyman => {
      let weight = 4;
      
      
      issues.forEach( issue => {
        if (issue.handyman && issue.handyman.id === handyman.id) {
          handyman.ctr++;
        }
      })
      
      //weight logic
      if ( handyman.ctr/issues.length > 0 && handyman.ctr/issues.length < 0.25)
        {
        weight = 4;
      } else if ( handyman.ctr/issues.length > 0.25 && handyman.ctr/issues.length < 0.50)
        {
        weight = 3;
      } else if ( handyman.ctr/issues.length > 0.50 && handyman.ctr/issues.length < 0.75)
        {
        weight = 2;
      } else if ( handyman.ctr/issues.length > 0.75 && handyman.ctr/issues.length < 1)
        {
        weight = 1;
      }

      return { weight: weight, id: handyman.id };
    });
    
    console.log(table);
    
    // const table = (handymanCounters).map((handyman) => {
    //   let weight = 1;
    //   const issuesCount = handymanCounters[handyman];
    //   console.log("This is the handyman");
    //   console.log(handyman);
    
    //   if (issuesCount >= 1 && issuesCount <= 2) {
    //     weight = 2;
    //   } else if (issuesCount > 2) {
    //     weight = 4;
    //   }
    
    //   return { weight: weight, id: handyman };
    // });
    
    // table = [{weight: 2, handyman_id: 45},
    //{weight: 4, handy_id: 22}
    //]
    
    // Choose a random handyman using the weighted table
    const chosenHandyman = rwc(table);
    console.log("Randomly chosen handyman:", chosenHandyman);
  } catch (err) {
    console.log(err);
  }
}

// Call the function to execute it
getHandyMan();

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