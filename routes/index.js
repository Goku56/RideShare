const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const Share = require("../models/share");
//Welcome
router.get('/',(req,res)=>{
    res.render("welcome");
});

//Dashboard
router.get('/dashboard',ensureAuthenticated,(req,res)=>
    res.render("dashboard",{
        name: req.user.name
    }));

router.post('/dashboard', async (req,res)=>{
    try{
        const shareDetails = new Share({
            vehicle:req.body.vehicle,
            from:req.body.from,
            to:req.body.to,
            time:req.body.time,
            seat:req.body.seat,
            phone:req.body.phone,
            message:req.body.message
        })
        const result = await shareDetails.save();
        res.status(200).send('Submitted');
    }catch(e){res.send(`connection is failed due to error: ${e}`)}
})

router.get('/details', async (req,res)=>{
    Share.find({},function(err, rides){
        res.render("details",{
            rideList:rides
        })
    })
})


module.exports = router;