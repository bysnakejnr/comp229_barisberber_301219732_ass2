let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let passport = require('passport');

let Contact = require('../models/contacts');

let contactController = require('../controllers/contacts')

function requireAuth(req,res,next){
if(!req.isAuthenticated()){

    return res.redirect('/login');
}
next();

}


//connect to contacts model
router.get('/', contactController.displayContactList )


//displaying add page
router.get('/add',requireAuth, contactController.displayAddPage);

//processing add page
router.post('/add',requireAuth, contactController.postAddPage);

        //display edit contacts page
    router.get('/edit/:id',requireAuth, contactController.displayEditPage);
    //process edit page
    router.post('/edit/:id',requireAuth, contactController.postEditPage );

    //delete a contact
    router.get('/delete/:id',requireAuth, contactController.postDelete);
module.exports = router;