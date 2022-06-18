const mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({
    cart: Object,
    wishlist: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"ProdBase"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId
    } 
})



module.exports =mongoose.model('ItemBase', ItemSchema);