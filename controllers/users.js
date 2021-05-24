const User = require('../models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
};

module.exports.createUser = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        // hash password and store hash results
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to YelpCamp, ${username}!`);
            res.redirect('/campgrounds');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/loginForm');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
};