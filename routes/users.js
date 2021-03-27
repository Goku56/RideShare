const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render("login");
});

router.get('/register',(req,res)=>{
    res.render("register");
});

router.post('/register',(req,res)=>{
    const {name,email,password,password2} = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg:"please enter the correct details"})
    }

    if(password != password2){
        errors.push({msg:"passwords are not matching"})
    }

    if(password.length < 6){
        errors.push({msg:"password should be at least 6 characters"})
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      }else{
          User.findOne({email:email})
          .then(user =>{
              if(user){
                //user exists
                errors.push({msg:"Email already exists"});
                  res.render('register', {
                      errors,
                      name,
                      email,
                      password,
                      password2
                  });
              }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg','You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err =>console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
//  Logout
router.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
    next();
})




module.exports = router;