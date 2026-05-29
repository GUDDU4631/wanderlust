const express = require('express');
const app = express();
const path = require('path');


const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


//self define Error class
const ExpressError = require("./utils/ExpressError.js");
//template for ejs
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
//method-override for method change in HTML file.
const methodOverride = require('method-override');
//basic setup for file using;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
  uri: process.env.ATLASDB_URL,
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

const sessionOption = {
    // store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
    store: store,
};


//read the data from url and json formate
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(session(sessionOption));
app.use(cookieParser(process.env.SECRET));
app.use(flash()); //one time message generator

app.use(passport.initialize()); //passport initialize
app.use(passport.session()); // session initialize for authentication

passport.use(new LocalStrategy(User.authenticate())); // ready on passport-local package ...
passport.serializeUser(User.serializeUser()); // use for serialize in session cookie
passport.deserializeUser(User.deserializeUser()); // use for desrialize in session cookie

app.use((req, res, next) => {
    res.locals.SuccessMsg = req.flash("success");
    res.locals.ErrorMsg = req.flash("error");
    res.locals.CurrUser = req.user;
    next();
});



const userRouter = require("./routes/user.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");




//register router
app.use("/",userRouter);
//listing router
app.use("/listing", listingRoute);

//review router 
app.use("/listing/:id/review", reviewRoute);



//ERROR HANDLING 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error" } = err;
    res.status(status).render('error.ejs', { err });
});

module.exports = app;