const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

router.get('/', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  );
});

router.post('/API/resource', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  );
});

router.put('/API/resource', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  );
});

router.delete('/API/resource', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  );
});

module.exports = router;