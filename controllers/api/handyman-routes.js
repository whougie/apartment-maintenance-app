const router = require('express').Router();
const Handyman = require("../../models/Handyman");

// GET all Handyman
router.get('/', async (req, res) => {
   try {
     const handymanData = await Handyman.findAll();
     console.log(handymanData);
     return res.status(200).json(handymanData);
   } catch (err) {
     console.log(err)
     return res.status(500).json(err);
     
   }
 });
 
 // GET one Handyman
 router.get('/:id', async (req, res) => {
   try {
     const handymanData = await Handyman.findByPk(req.params.id);
     if (!issueData) {
       res.status(404).json({ message: 'No Issue with this id!' });
       return;
     }
     res.status(200).json(handymanData);
   } catch (err) {
     res.status(500).json(err);
   }
 });

 module.exports = router;
