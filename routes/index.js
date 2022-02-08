var express = require('express');
var router = express.Router();

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
router.get('/portfolio', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

/* GET Resume page. */
router.get('/resume', function(req, res, next) {
  res.render('index', { title: 'Resume' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});

module.exports = router;
