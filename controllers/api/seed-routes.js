const seeds = require("../../seeds")
const router = require('express').Router();
router.post("/", ( req , res ) => {seeds()})

module.exports = router;
