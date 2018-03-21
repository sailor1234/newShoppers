const express = require('express');
var path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/user');

module.exports = (app) => {
    app.post('/signup',async (req,res) => {
        const user = new User();
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.address = req.body.address;
        user.country = req.body.country;
        user.state = req.body.state;
        user.city = req.body.city;
        user.postalcode = req.body.postalcode;
        user.phone = req.body.phone;
        const reponseSaveUser = await user.save();
        if(reponseSaveUser){
            res.status(200).json({'success':true});
        }else{
            res.status(500).json({'success':false});
        }
        console.log(reponseSaveUser)
    })
}
// router.post('/signup',(req,res) => {
//     console.log(req.body);
// })
// // delete user

// router.delete('/:userId', (req, res, next) => {
//     User.remove({ _id: req.params.userId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "user deleted"
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });




