let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('./parts/home', { title: 'Home' }, );
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('./parts/about', { title: 'About' });
});

/* GET portfolio page. */
router.get('/services', function(req, res, next) {
  res.render('./parts/services', { title: 'Services' });
});

/* GET Resume page. */
router.get('/projects', function(req, res, next) {
  res.render('./parts/projects', { title: 'Projects' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('./parts/contact', { title: 'Contact' });
});

/* GET Route for Login. */
router.get('/login', indexController.displayLoginPage );

/* Post Route for Login. */
router.post('/login', indexController.processLoginPage );

/* GET Route for Register. */
router.get('/register', indexController.displayRegistPage );

/* Post Route for Register. */
router.post('/register', indexController.processRegistPage );

/* GET Route for logout. */
router.get('/logout', indexController.performLogout );

module.exports = router;

