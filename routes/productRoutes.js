const express = require('express'),
    router=express.Router();
    const mongoose = require('mongoose');

const Comment = require('../models/commentModel');
var ProdBase=require('../models/productModel');
const {isLoggedIn, isNotLoggedIn} = require('../middleware.js');

router.get('/search', async (req,res)=>{
    var regx=new RegExp(req.query["term"],'i');
    const products= await ProdBase.find({name:regx},{"name":1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(6);
    // name and author
    var result=[];
    if(!products){
        console.log("error in finding searching");
        let obj={
            id:"",
            label:"not found"
        };
        res.jsonp(obj);
    }else{
        if(products.length>0){
            products.forEach(item=>{
                let obj={
                    id:item._id,
                    label:item.name
                };
                result.push(obj);
            })
        }
        else
        {
            let obj={
                id:"",
                label:"not found"
            };
            result.push(obj);
        }
        res.jsonp(result);
        }
})


router.get('/:id', async (req, res) => {
    res.locals.title='Product';
    const productID=req.params.id;
    const product= await ProdBase.findById(productID).populate("comments");
    if(!product) {
        res.redirect('/');
    } else {
        res.render('product', {product});
    }
})

router.post('/:id/comment-rating', isLoggedIn, async (req, res) => {
    const ratings=(parseInt(req.body.rate));
    const newComment = new Comment({ 
        rating: ratings,
        comment: req.body.comment,
        title: req.body.title, 
        userID: req.user._id,
        userName:req.user.name
    });
    await newComment.save((err,comment)=>{
        if(err) {
            console.log(" error while saving "+err);
        }
        else {
            ProdBase.findById(req.params.id)
                .then((product)=>{
                    product.totRating++;
                    const newRate=product.star[ratings-1]+1;
                    product.star.set(ratings-1,newRate);
                    if(comment.comment!='') {
                        product.totComments++;
                    }
                    product.comments.push(comment);
                    product.save((err,product)=>{
                        if(err)
                        console.log("error while saving comment in product"+err);
                    })
                })
                .catch((err)=>{
                    console.log('Error in finding : '+err);
                })
        }
    });
    res.redirect('/product/'+req.params.id);
})


module.exports = router;