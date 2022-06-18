const express = require('express')
router = express.Router();

const mongoose = require('mongoose');
const { isLoggedIn } = require('../middleware');

var Cart = require('../models/cartModel');
var ProdBase = require('../models/productModel');
var item = require('../models/itemModel');

function GetCart(id, callback) {

    item.findOne({ userId: id }, (err, value) => {
        if (err) {
            callback(true, "not exist");
        }
        else {
            callback(null, value.cart);
        }
    })
}

function addtodb(id, cart) {
    item.findOne({ userId: id }, (err, value) => {
        if (err) {
            console.log("not save")
            return;
        }
        else {
            value.cart = cart;
            value.save((err) => {
                if (err) console.log("error while saving " + err);
                
            });

        }
    })
}

// cart qty update
router.get('/cartQty',(req,res)=>{
    cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
    res.send(cart);
})


// add to the cart
router.get('/:id', (req, res) => {
    res.locals.title = "Cart";
    var productId = req.params.id;

    var cart;
    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    cart = new Cart({ items: {} });
                ProdBase.findById(req.params.id, (err, product) => {
                    if (err)
                        return res.redirect('/home');

                    cart.add(product, req.params.id);
                    req.session.cart = cart;
                    addtodb(req.user._id, cart);
                    req.flash('success','Added to cart!');
                    return res.send(cart);
                })
            }
        });

    }


    else {
        cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
        ProdBase.findById(req.params.id, (err, product) => {
            if (err)
                return res.redirect('/home');
            cart.add(product, req.params.id);
            req.session.cart = cart;
            return res.send(cart);
        })

    }


});

// increase the cart item quantity
router.get('/:id/increase', (req, res) => {
    res.locals.title = "Cart";

    var cart;

    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    return res.send('');
                cart.increase(req.params.id);
                req.session.cart = cart;
                addtodb(req.user._id, cart);
                return res.send(cart);
            }
        });

    }

    else {
        cart = new Cart(req.session.cart);
        cart.increase(req.params.id);
        req.session.cart = cart;

        return res.send(cart);
    }

})

router.get('/:id/decrease', (req, res) => {
    res.locals.title = "Cart";
    var cart;

    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    return res.send('');
                cart.decrease(req.params.id);
                req.session.cart = cart;
                addtodb(req.user._id, cart);
                return res.send(cart);
            }
        });

    }

    else {
        cart = new Cart(req.session.cart);
        cart.decrease(req.params.id);
        req.session.cart = cart;

        return res.send(cart);
    }

})


router.get('', (req, res) => {
    res.locals.title = "Cart";
    var cart;

    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    cart = new Cart({ items: {} });
                res.render('cart', { products: cart.generateArray() });

            }
        });

    }

    else {
        cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
        res.render('cart', { products: cart.generateArray() });
    }




})

// remove from the cart
router.get('/:id/remove', (req, res) => {
    res.locals.title = "Cart";
    var cart;

    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    return res.send('');
                cart.remove(req.params.id);
                req.session.cart = cart;
                addtodb(req.user._id, cart);
                return res.send(cart);
            }
        });

    }

    else {
        cart = new Cart(req.session.cart);
        cart.remove(req.params.id);
        req.session.cart = cart;

        return res.send(cart);
    }
});

router.get('/:id/:price', (req, res) => {


    var cart;

    if (isLoggedIn && req.isAuthenticated()) {

        GetCart(req.user._id, (err, value) => {
            if (err) {
                console.log(err);
                return res.send('');
            }
            else {
                if (value)
                    cart = new Cart(value);
                else
                    return res.send('');
                cart.setPrice(req.params.id, req.params.price);
                req.session.cart = cart;
                addtodb(req.user._id, cart);
                return res.redirect('/cart');
            }
        });

    }

    else {
        cart = new Cart(req.session.cart);
        cart.setPrice(req.params.id, req.params.price);
        req.session.cart = cart;

        return res.redirect('/cart');
    }
})




module.exports = router;