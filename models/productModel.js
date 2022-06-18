const mongoose = require('mongoose');




var ProductSchema = new mongoose.Schema({
    img: [{      
            type: String,
            required: true
    }],
    name: {
        type: String,
        required: true
    },
    author: [{
        type: String,  
        required: true
    }],
    publisher: {
        type: String,
        required: true
    },
    page: Number,
    language: {
        type: String,
        required: true
    },
    edition: {
        type: Number,
        required: true
    },
    publishing_date: {
        type: String,
        required: true
    },
    ISBN10: {
        type: String,
        required: true
    },
    ISBN13: {
        type: String,
        required: true
    },
    discount: Number,
    description: {
        type: String,
        required: true
    },
    price_Kindle: Number,
    price_HardCover: Number,
    price_PaperBack: {
        type: Number,
        required: true
    },
    totRating: {
        type: Number,
        default: 0
    },
    totComments: {
        type: Number,
        default: 0
    },
    star: [{
        type: Number,
    }],
    date: {
        type: Date,
        default: Date.now
    },
    // ProductSchema(
    //  constructor
    // )
    comments: [{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Comment"
    }],

});

module.exports =mongoose.model('ProdBase', ProductSchema);