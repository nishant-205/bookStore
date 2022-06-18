const express=require("express"),
    mongoose= require("mongoose"),
    // bodyParser=require("body-parser"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    User=require("./models/userModel"),
    dotenv= require("dotenv");
    flash=require("connect-flash");
    
const session=require('express-session'),
      cookieParser=require('cookie-parser'),
      MongoStore=require('connect-mongo')(session);
      ProdBase=require('./models/productModel');


dotenv.config();

const {isLoggedIn, isNotLoggedIn, isAdmin} = require('./middleware.js');

const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wlRoutes = require('./routes/wlRoutes');
const productRoutes = require('./routes/productRoutes');


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
}
mongoose.connect(process.env.DB_PROD,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const app=express();

app.use(cookieParser());

app.use(session({
    secret: process.env.sessionSecret,
    resave:false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:3*60*60*1000}
}));

app.use(flash());

app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.session= req.session;    
    res.locals.message=req.flash('message');
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    next();
})

app.use('/', userRoutes);
app.use('/cart', cartRoutes);
app.use('/wl', wlRoutes);
app.use('/product', productRoutes);

app.get("/", (req,res)=>{
    res.locals.title='bookStore';
    ProdBase.find({}, (err, AllProd) => {
        if (err) {
            req.flash('error','Error occurred: ' + err)
            res.redirect('404');
        }
        else {
            res.render("home", { prod: AllProd });
        }
    })
})


app.get("/new-product",isLoggedIn, isAdmin,  (req, res) => {
    res.locals.title='Add New Product!';
    res.render('new-product');
})

app.post("/new-product",isLoggedIn, isAdmin, (req, res) => {
    req.body.Prod.star=[0,0,0,0,0];
    ProdBase.create(req.body.Prod, (err) => {
        if (err)
            req.flash('error',err);
        else 
            req.flash('success','Product Added!');      
        res.redirect('/');
    })
});

app.get('/dev', (req,res)=>{
    res.locals.title='Developers';
    res.render('developers');
})

app.get('*', (req,res) =>{
    res.locals.title='Page Not Found!';
    res.render('404');
})

app.listen(process.env.PORT, function(){       
    console.log("Server up and running!");
})