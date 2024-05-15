const router = require('express').Router();
const { Tenant, Manager, Apartment, Issues, Handyman,  } = require("../../models");
//const Issues = require("../../models/Issues");

// GET all Issues
router.get('/', async (req, res) => {
  try {
    const issueData = await Issues.findAll({
      include: [{ model: Tenant}
        , {model: Manager}, {model: Handyman}]
    });
    res.status(200).json(issueData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// GET one Issue
router.get('/:id', async (req, res) => {
  try {
    const issueData = await Issues.findByPk(req.params.id);
    if (!issueData) {
      res.status(404).json({ message: 'No Issue with this id!' });
      return;
    }
    res.status(200).json(issueData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new Issue
router.post('/', async (req, res) => {
   try {
     const issueData = await Issues.create(req.body);
     res.status(200).json(issueData);
   } catch (err) {
     res.status(400).json(err);
   }
 });

// UPDATE a Issue
router.put('/:id', async (req, res) => {
  try {
    const issueData = await Issues.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!issueData[0]) {
      res.status(404).json({ message: 'No Issue with this id!' });
      return;
    }
    res.status(200).json(issueData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a Issue
router.delete('/:id', async (req, res) => {
  try {
    const issueData = await Issues.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!issueData) {
      res.status(404).json({ message: 'No Issue with this id!' });
      return;
    }
    res.status(200).json(issueData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
