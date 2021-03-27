const mongoose = require('mongoose');

const shareScheme = new mongoose.Schema({
    vehicle:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    time:{
        type:String,
        require:true
    },
    seat:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    message:{
        type:String,
        required:true
    }  
});

const Share = new mongoose.model('Share',shareScheme);

module.exports = Share;