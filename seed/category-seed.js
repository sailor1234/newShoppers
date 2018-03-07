var  Category = require('../models/category');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myshop');


var category = [ 
    new Category({
        _id:new mongoose.Types.ObjectId(),
    name:'Mobile Phones',
    details:'Shop for the latest mobile phones'
}),
new Category({
    _id:new mongoose.Types.ObjectId(),
    name:'Laptops',
    details:'Buy the latest laptops at affordable prices'
}),
new Category({
    _id:new mongoose.Types.ObjectId(),
    name:'Headphones',
    details:'Quality headphones of all types'
}),
new Category({
    _id:new mongoose.Types.ObjectId(),
    name:'Camera',
    details:'Our cameras are the best you can buy'
}),
];

var done = 0;
for(var i = 0; i< category.length; i++){
    category[i].save(function(err, result){
        done++;
        if(category === category.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}