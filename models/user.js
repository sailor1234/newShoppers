const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const userSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{
        type:String,
        required:true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username:{type:String},
    password:{type:String,required:true,trim:true},
    address:{type:String},
    country:{type:String},
    state:{type:String},
    city:{type:String},
    postalcode:{type:Number},
    phone:{type:Number}


});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User', userSchema);