const express = require('express'),
    router=express.Router();
    const mongoose = require('mongoose');

const Comment = require('../models/commentModel');
const ProdBase=require('../models/productModel');
const Item=require('../models/itemModel');
var Cart = require('../models/cartModel');

const {isLoggedIn, isNotLoggedIn} = require('../middleware.js');
const { route } = require('./userRoutes');


router.get('/:id', isLoggedIn, (req,res)=>{
    
    let productId=req.params.id;
    Item.findOne({userId: req.user._id})
        .then((item)=>{
            for(let a of item.wishlist) {
                if(a==productId) {
                    return ;
                }
            }
            ProdBase.findById(productId)
                .then((prod)=>{
                    item.wishlist.push(prod);
                    item.save();
                   
                })
                .catch((err)=>{
                    console.log('error '+err);
                    
                })
        })
        .catch((err)=>{
            console.log('error '+err);
        })
        return;
});
router.get('/remove/:id', (req,res)=>{
    let productId=req.params.id;
    Item.findOne({userId: req.user._id})
        .then((item)=>{
            item.wishlist.splice(item.wishlist.indexOf(productId),1);
            item.save();
            return res.send(item);
        })
        .catch((err)=>{
            console.log('error '+err);
        })
})
module.exports=router;