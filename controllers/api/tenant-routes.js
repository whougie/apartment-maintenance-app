// const bcrypt = require("bcrypt")
// const router = require('express').Router();
// const { Tenant, Manager, Apartment, Issue, Handyman,  } = require("../../models");
// const Issue = require("../../models/Issue");

// router.post("/login", async (req, res) => {

//     console.log("pw", req.body.password)

//     const tenantAcct = await Tenant.findOne({
//         where: {
//             tenant_email: req.body.email
//         }
//     })

//     let verified 

//     if( !tenantAcct ){
//         return res.status(401).json({ msg: 'invalid login'})
//     } else {
//         verified = await bcrypt.compare(req.body.password, tenantAcct.tenant_password)
//         console.log(verified) 
//     }

//     if( !verified ){
//         return res.status(401).json({ msg: 'invalid login'})
//     }

//     req.session.save( () => {
//         req.session.logged_in = true;
//         req.session.tenant = tenantAcct;
//         res.status(200).json({ msg: 'valid login'})
//     })

// })



// module.exports = router;
