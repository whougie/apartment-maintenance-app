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
    console.log(err)
    res.status(400).json({ status: "error" })
  }
  
  console.log(emailCheck)
  if( !emailCheck ){
    return res.status(401).json({ status: "error", message: "Username or Password does not match" })
  }
  
  // if we are this far, then the email matched
  const hashedPassword = emailCheck.tenant_password
  
  // time to verify the hashed password 
  const verified = await bcrypt.compare(req.body.tenant_password, hashedPassword)
  
  if( verified ){
    const tenant = emailCheck.get({plain:true})
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.userId = tenant.id
      res.json({ status: "success", payload: tenant })
    })
  } else {
    res.status(401).json({ status: "error", message: "User is unauthenticated" })
  }
  
})


router.post("/tenant", async (req, res) => {
  console.log(req.body)
  try {
    const apartmentData = await Apartment.findAll();
    const apartments = apartmentData.map( apartment => {
      return apartment.get({plain: true})
    })
    
    const apartmentRoom = apartments.filter( apartment => { // find matching apt id for the apt room
      return apartment.apt_number === req.body.tenant_aptNumber;
    })
console.log(apartmentRoom )
    const result = await Tenant.create({tenant_name: req.body.tenant_name, tenant_email: req.body.tenant_email, tenant_password: req.body.tenant_password, apt_id: apartmentRoom[0].id});
    const tenant = result.get({plain:true})
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.userId = tenant.id
      res.json({ status: "success", payload: result })
    })
    
  } catch(err){
    console.log(err)
    res.status(400).json({ status: "error" })
  }
})

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.status(204).end())
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
    console.log(err);
    res.status(400).json({ status: "error" })
  }
})



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
    
    
    const chosenHandyman = rwc(table);
    console.log("Randomly chosen handyman:", chosenHandyman);
  } catch (err) {
    console.log(err);
  }
}

// Call the function to execute it
getHandyMan();


module.exports = router;