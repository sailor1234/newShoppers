const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
router.get('/', (req, res, next) => {
    console.log(req.path)
    User.find()
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
})
router.post('/signup', (req, res, next) => {

    let newUser = new User({
        _id: new mongoose.Types.ObjectId(),

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: "123456",
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        postalcode: req.body.postalcode,
        phone: req.body.phone

    });
    console.log(newUser)
    return newUser.save((err) => {
        console.log(err);
        return res.json({})
    })

    return User.create(JSON.parse(JSON.stringify(newUser)), (err, data) => {
        console.log(err)
        console.log(data);
        res.json({})
    })
    User
        .find()
        .then(user => {
            console.log('user', user)
            if (user.length >= 1) {
                res.status(409).json({
                    message: "mail exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        console.log('test')
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            address: req.body.address,
                            country: req.body.country,
                            state: req.body.state,
                            city: req.body.city,
                            postalcode: req.body.postalcode,
                            phone: req.body.phone

                        });
                        newUser
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created perfectly'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });

                    }
                });

            }
        });


});
// delete user

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;