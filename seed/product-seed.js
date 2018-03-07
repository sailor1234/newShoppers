var  Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myshop');


var product = [
    new Product({
    imagePath:'/Users/macosx/Desktop/Shoppers/uploads/cam1.png',
    name:'Camcorder',
    description:'Video camcorder with high video resolution and long batery life.',
    price:'50',
    specification:'Highlight: Built in Adobe flash. Memory SD card upward to 32GB.  Face recognition, Smile Capture, Keep on Shot. ',
    category:'5a904f6010e67b03cbe4db12'

}),
    new Product({
    imagePath:'/Users/macosx/Desktop/Shoppers/uploads/cam3.png',
    name:'local',
    description:'Video camcorder with high video resolution and long batery life.',
    price:'50',
    specification:'Highlight: Built in Adobe flash. Memory SD card upward to 32GB.  Face recognition, Smile Capture, Keep on Shot. ',
    category:'5a904f6010e67b03cbe4db12'

}),
];
var done = 0;
for(var i = 0; i< product.length; i++){
    product[i].save(function(err, result){
        done++;
        if(product === product.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
