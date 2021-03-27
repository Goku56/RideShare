const express = require('express');
const expressLayout = require('express-ejs-layouts')
require("./db/conn");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//passport config
require("./config/passport")(passport);


//EJS
app.use(expressLayout);
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

//passport middle
app.use(passport.initialize());
app.use(passport.session());

// Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


//routers 
app.use("/",require("./routes/index"));
app.use("/users",require("./routes/users"));

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});