const router = require('express').Router();
const { Tenant, Manager, Apartment, Issue, Handyman, } = require("../../models");
//const Issue = require("../../models/Issue");

// GET all Issues
router.get('/', async (req, res) => {
  console.log("hello")
  try {
    const issueData = await Issue.findAll({
      include: [{ model: Tenant }
        , { model: Manager }, { model: Handyman }]
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
    const issueData = await Issue.findByPk(req.params.id);
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
    const issueData = await Issue.create({...req.body, tenant_id: req.session.userId});
    res.status(200).json(issueData);
  } catch (err) {
    res.status(400).json(err,);
    console.log(err)
  }
});

// UPDATE a Issue
router.put('/:id', async (req, res) => {
  try {
    const issueData = await Issue.update(req.body, {
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
    const issueData = await Issue.destroy({
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
