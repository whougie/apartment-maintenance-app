const router = require('express').Router();
const Issues = require('../../models/Issues');

// GET all Issues
router.get('/', async (req, res) => {
  try {
    const issueData = await Issue.findAll();
    res.status(200).json(issueData);
    console.log(issueData);
  } catch (err) {
    res.status(500).json(err);
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
     const issueData = await Issue.create(req.body);
     res.status(200).json(issueData);
   } catch (err) {
     res.status(400).json(err);
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
