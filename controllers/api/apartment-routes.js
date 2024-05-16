const router = require('express').Router();
//const { Tenant, Manager, Apartment, Issue, Handyman,  } = require("../../models");
const Apartment = require("../../models/Apartment");

// GET all Apartment
router.get('/', async (req, res) => {
   try {
     const apartmentData = await Apartment.findAll();
     console.log(apartmentData);
     return res.status(200).json(apartmentData);
   } catch (err) {
     console.log(err)
     return res.status(500).json(err);
     
   }
 });
 
 // GET one Apartment
 router.get('/:id', async (req, res) => {
   try {
     const apartmentData = await Apartment.findByPk(req.params.id);
     if (!issueData) {
       res.status(404).json({ message: 'No Issue with this id!' });
       return;
     }
     res.status(200).json(apartmentData);
   } catch (err) {
     res.status(500).json(err);
   }
 });

 module.exports = router;
