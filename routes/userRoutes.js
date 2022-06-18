const router = require('express').Router();
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn, validateEmail, validatePassword,validateChangePassword} = require('../middleware.js');

router.get('/profile', isLoggedIn, (req,res) => {
    res.locals.title='Profile';
    Item.findOne({userId: req.user._id}, async (err,item)=>{
        if(err)
            console.log('Error Finding in Item '+err);
        else {
            const wl= await Item.findOne({userId: req.user._id}).populate("wishlist");
            res.render('profile', {user: req.user, wl} );
        }
    })
})
router.get('/profile/editaddress/:id',isLoggedIn, (req,res) => {
    const addrID= req.params.id;
    User.findById(req.user._id, (err,user) =>{
        for(let a of user.addr) {
            if(a._id==addrID)
               {
                    return res.send(a);
               }
        }
    })
});


router.get("/login-register", isNotLoggedIn, (req,res)=>{
    res.locals.title='Login/Register';
    res.render("login-signup");
});

router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/');
})



router.post('/change-pass', isLoggedIn, validateChangePassword, (req,res)=>{
    req.user.changePassword(req.body.oldPass,req.body.newPass)
        .then(()=>{
            req.flash('success','Password reset successful!');
            res.redirect('/profile');
        })
        .catch(()=>{
            req.flash('error', 'Incorrect Password');
            res.redirect('/profile');
        })
})
router.post('/profile', isLoggedIn, (req,res) =>{
    var name=req.body.name;
    var dob=req.body.dob;
    var phno=req.body.phno;
    var gender=req.body.gender;
    User.findById(req.user._id, (err,user)=>{
        user.name=name?name:user.name;
        user.dob=dob?dob:user.dob;
        user.phno=phno?phno:user.phno;
        user.gender=gender?gender:user.gender;
        user.save((err)=>{
            if(err) throw err;
            req.flash('success', 'Profile updated!');
            res.redirect('/profile');
        })
    })
});
router.post('/addr', isLoggedIn, (req,res) => {
    User.findById(req.user._id, (err,user)=>{
        if(req.body.Addr.isDefault) {
            for(let add of user.addr){
                if(add.isDefault)
                    add.isDefault=false;
            }
        }
        user.addr.push(req.body.Addr);
        user.save((err)=>{
            if(err) throw err;
            req.flash('success', 'Address added!')
            res.redirect('/profile');
        })
    })
})
router.post('/addr-edit', isLoggedIn, (req,res) => {
    User.findById(req.user._id, async (err,user)=> {
        var c=0;
        if(req.body.Addr.isDefault){
            for(let add of user.addr){
                if(add.isDefault)
                    add.isDefault=false;
            }
        }
        for(let a of user.addr) {
            if(a._id==req.body.Addr._id)
               {
                    user.addr[c]=req.body.Addr;
                    await user.save((err)=>{
                        if(err) throw err;
                        req.flash('success', 'Address updated!')
                        res.redirect('/profile');
                    })
               }
            ++c;
        }
    })
})
router.post('/addr-del', (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        var c=0;
        for(let a of user.addr) {
            if(a._id==req.body.Addr._id)
               {
                    break;
               }
            ++c;
        }
        user.addr.splice(c,1);
        user.save((err)=>{
            if(err) throw err;
            req.flash('success', 'Address deleted!');
            res.redirect('/profile');
        }) 
    })
})

router.post("/register", validateEmail, validatePassword, (req,res)=>{
    const {email, name, password}=req.body;
    User.findOne({'email': email})
        .then(async (user)=>{
            if(!user) {
                const user = new User({email,name});
                const registeredUser =await User.register(user, password);
                req.login(registeredUser, err => {
                    if(err) return next(err);
                    req.flash('success','Welcome to bookStore');
                    req.flash('success', ' Registration Successful!');
                    const redirectTo= req.session.returnTo || '/';
                    delete req.session.returnTo;
                    Item.create({
                        userId:req.user._id         
                    },(err,value)=>{
                        if(err)
                            console.log("while creating item"+err);
                        else console.log(value);
                    })
                    res.redirect(redirectTo);
                });
            }
            else {
                req.flash('error','Email already registered!');
                res.redirect('/login-register');
            }
        }).catch((err)=> {
            console.log('Something went wrong '+err);
            res.redirect('/login-register');
        })
})

router.post("/login", validateEmail, validatePassword, passport.authenticate('local', {failureFlash:'Username or Password is invalid!', failureRedirect: "/login-register"}), (req,res)=>{
    req.flash('success', 'Login Successful!');
    res.locals.currentUser=req.user;
    const redirectTo= req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
})


module.exports=router;