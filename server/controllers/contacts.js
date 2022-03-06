let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

let Contact = require('../models/contacts');

module.exports.displayContactList = (req,res,next)=>{
    Contact.find((err, contactList)=>{
    
        if(err){
    
            return console.error(err);
        }
        else{
            //getroute for contacts list
            res.render('./contacts/contactslist',{title:'Contact List',ContactList :contactList, 
            displayName : req.user ? req.user.displayName : ''
        });
        }
    });   
    };

module.exports.displayAddPage = (req,res,next)=>{
    res.render('contacts/add',{title:'Add a Contact',
    displayName : req.user ? req.user.displayName : ''});
 
}

module.exports.postAddPage = (req,res,next)=>{
    
    let newContact = Contact({
    "name" : req.body.name,
    "number" : req.body.number,
    "email" : req.body.email})

    Contact.create(newContact,(err,Contact)=>{
if(err){
    console.log(err);
    res.end(err);
}

else{
    res.redirect('/contact-list')
}

    })}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    Contact.findById(id,(err,ContactToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('contacts/edit',{title: 'Edit a Contact', Contact :ContactToEdit,
            displayName : req.user ? req.user.displayName : ''});
        }

    })
 
}
module.exports.postEditPage =(req,res,next)=>{
    let id = req.params.id;
    
    let updatedContact = Contact({
        "_id": id,
        "name" : req.body.name,
        "number" : req.body.number,
        "email" : req.body.email});
 
        Contact.updateOne({_id:id},updatedContact, (err)=> {
        if(err){

            console.log(err);
            res.end(err);
        }
    else {res.redirect('/contact-list')}
    })
}
module.exports.postDelete = (req,res,next)=>{
    let id = req.params.id;
    Contact.remove({_id:id}, (err)=>{
    if(err){
    console.log(err);
    }
    else{
        res.redirect('/contact-list')
    }

    })
}