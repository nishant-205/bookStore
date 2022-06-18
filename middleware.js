
const isLoggedIn = (req,res,next) => {
    req.session.returnTo=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged in!');
        return res.redirect("/login-register");
    }
    next();
}
const isNotLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}
const isAdmin = (req,res,next) =>{
    if(req.user.email!=process.env.adminEmail){
        return res.redirect('/404');
    }
    next();
}
const validateEmail = (req,res,next) => {
    let mail=req.body.username || req.body.email;
    var re = /\S+@\S+\.\S+/;
    if(!re.test(mail))
    {
        req.flash('error', 'Invalid Email!');
        return res.redirect("/login-register");
    }
    next();
}
const validatePassword =(req,res,next)=>{
    if(req.body.password.length<8)
    {
        req.flash('error','Password must be 8 characters long');
        return res.redirect('/login-register');
    }
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if(!(req.body.password.match(lowerCaseLetters)&&(req.body.password.match(upperCaseLetters))&&(req.body.password.match(numbers))))
    {
        req.flash('error','Password must include a number, an uppercase and a lowercase alphabet');
        return res.redirect('/login-register');
    }
    next();
}
const validateChangePassword = (req,res,next)=>{
    if(req.body.oldPass.length<8 || req.body.newPass.length<8)
    {
        req.flash('error','Password must be 8 characters long');
        return res.redirect('/profile');
    }
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if(!(req.body.newPass.match(lowerCaseLetters)&&(req.body.newPass.match(upperCaseLetters))&&(req.body.newPass.match(numbers))))
    {
        req.flash('error','New Password must include a number, an uppercase and a lowercase alphabet');
        return res.redirect('/profile');
    }
    if(!(req.body.oldPass.match(lowerCaseLetters)&&(req.body.oldPass.match(upperCaseLetters))&&(req.body.oldPass.match(numbers))))
    {
        req.flash('error','Old Password must include a number, an uppercase and a lowercase alphabet');
        return res.redirect('/profile');
    }
    next();
}
module.exports={isLoggedIn, isNotLoggedIn, isAdmin, validateEmail, validatePassword, validateChangePassword};