const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('in /project/ root')
  res.send('<p>This is test content. The page is \'/project/\'. That is, it is the top of the project hierarchy.</p>')

});

module.exports = router;
