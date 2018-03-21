const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup',(req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message:'this email already exist'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        fname:req.body.fname,
                        lname:req.body.lname,
                        email:req.body.email,
                        username:req.body.username,
                        password:hash,
                        address:req.body.address,
                        country:req.body.country,
                        state:req.body.state,
                        city:req.body.city,
                        postalcode:req.body.postalcode,
                        phone:req.body.phone


                
                    });
                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message:'user created '
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
            

        }
    })
   
   
    
});

// to delete user

router.delete('/:userId',(req, res, next)=>{
     User.remove({_id:req.params.userId})
     .exec()
     .then(result =>{
         res.status(200).json({
             message:'user deleted'
         });
     })
     .catch(err =>{
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
});

//login user

router.post('/login',(req, res, next)=>{
     User.find({email:req.body.email})
     .exec()
     .then(user =>{
         if(user.length < 1){
             return res.status(401).json({
                 message:'authentication failed'
             });
         }
         bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
              if(err){
                return res.status(401).json({
                    message:'authentication failed'
                });
              }
              if(result){
                const token = jwt.sign({
                      email:user[0].email,
                      userId:user[0]._id
                      
                  }, 'secret',
                  process.env.JWT_KEY,
                {
                    expiresIn:"1h"

                });
                  return res.status(200).json({
                      message:'authentication successful',
                      token:token
                  });
              }
              res.status(401).json({
                message:'authentication failed'
            });
         });
     })
     .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;