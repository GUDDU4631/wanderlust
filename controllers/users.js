const User = require("../models/user");
// signup After submit route 
module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Wellcome to wanderlust!");
            return res.redirect("/listing");
        })
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}
//  signUp before submit route 
module.exports.signUpForm = (req, res) => {
    res.render("users/signup.ejs");
}

// login after submit route 
module.exports.login = async (req, res) => {
    req.flash("success", "Wellcome back to Wanderlust");
    if (!res.locals.redirectUrl) {
        return res.redirect("/listing");
    } else {
        return res.redirect(res.locals.redirectUrl);
    }
}

// login before submit route 
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}

// logout route 
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "you are successfully loggedout");
        return res.redirect("/listing");
    })
}