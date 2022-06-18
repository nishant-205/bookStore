module.exports = function cart(oldCart) {

    this.items = oldCart.items || {};
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalQty = oldCart.totalQty || 0;
    this.add = function (product, productId) {
        var storedItem = this.items[productId];

        if (!storedItem) {
            storedItem = this.items[productId] = {
                product: product,
                incart: 0,
                price: 0,
                book_type:"PaperBack"
                
            }
        } 
            storedItem.incart++;
            if(!storedItem.price)
            storedItem.price = Number((product.price_PaperBack - product.price_PaperBack*product.discount/100).toFixed(2));
            this.totalPrice=Number((this.totalPrice + storedItem.price).toFixed(2));
            this.totalQty+=1;
            
    };
    this.generateArray=function(){
        
        var arr=[];
        for(var id in this.items)
        {
            arr.push(this.items[id]);
        } 
        return arr; 
    };
    this.increase= function(productId){

        this.items[productId].incart++;
        this.totalQty++;
        this.totalPrice+=this.items[productId].price; 
        this.totalPrice=Number(this.totalPrice.toFixed(2));  
    }
    this.decrease= function(productId){

        this.items[productId].incart--;
        this.totalQty--;
        this.totalPrice-=this.items[productId].price; 
        this.totalPrice=Number(this.totalPrice.toFixed(2));
        if(this.items[productId].incart==0)
        delete this.items[productId];

    }
    this.remove=function(productId)
    {
        if(this.items[productId])
        {
            this.totalPrice-=(this.items[productId].price)*(this.items[productId].incart);
            this.totalPrice=Number(this.totalPrice.toFixed(2));
            this.totalQty=this.totalQty-this.items[productId].incart;
            delete this.items[productId];
        }
    }

    this.setPrice=function(productId,newprice){
        if(this.items[productId])
        {
            var price;
            if(newprice=="PaperBack")
            price=Number((this.items[productId].product.price_PaperBack - this.items[productId].product.price_PaperBack*this.items[productId].product.discount/100).toFixed(2));
            else if(newprice=="HardCover")
            price=Number((this.items[productId].product.price_HardCover - this.items[productId].product.price_HardCover*this.items[productId].product.discount/100).toFixed(2));
            else price=Number((this.items[productId].product.price_Kindle - this.items[productId].product.price_Kindle*this.items[productId].product.discount/100).toFixed(2)); 
            this.items[productId].book_type=newprice;
            this.totalPrice-=(this.items[productId].price)*(this.items[productId].incart);
            this.items[productId].price=price;
            this.totalPrice+=(this.items[productId].price)*(this.items[productId].incart);
            this.totalPrice=Number(this.totalPrice.toFixed(2));
        }
    }
};