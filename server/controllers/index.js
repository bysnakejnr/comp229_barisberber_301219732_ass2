let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayLoginPage = (req,res,next) => {
     if(!req.user)
     {
         res.render('auth/login'),{
             title: "Login",
             messages : req.flash('loginMessage'),
             displayName : req.user ? req.user.displayName : ''
         }
         
     }
else{
             res.redirect('/');
         }

    
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', (err,user,info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err){
1
                return next(err);
            }
            const payload = {
                id: user._id,
                displayName : user.displayName,
                username : user.username,
                email : user.email
            }
        })
        return res.redirect('/contact-list');
        
    })(req,res,next);

   
}

module.exports.displayRegistPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/register'),{
            title: "Register",
            messages : req.flash('registerMessage'),
            displayName : req.user ? req.user.displayName : ''
        }
        
    }
else{
            res.redirect('/');
        }

   
}

module.exports.processRegistPage = (req,res,next) => {
    let newUser = new User({

        username : req.body.username,
        email : req.body.email,
        displayName : req.body.displayName
    });

    User.register(newUser, req.body.password,(err)=>{

        if(err){
            console.log("Error : Inserting new user failed")
            if(err.name == "UserExistsError"){
                req.flash('registerMessage', 'Registration Failed : User Already Exists');
            }
            console.log("User Registration error");
        
        return res.render('auth/register',{
            title: "Register",
            messages : req.flash('registerMessage'),
            displayName : req.user ? req.user.displayName : ''

        });
    }
        else{
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/contact-list')
            })

        }
        
    })
   
}

module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}