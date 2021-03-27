const mongoose = require("mongoose");

const hikerScheme = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    seat:{
        type:Number
        required:true
    },
    message:{
        type:String,
        required:true
    }  
});

const Hike = new mongoose.model('Hike',hikerScheme);

module.exports = Hike;