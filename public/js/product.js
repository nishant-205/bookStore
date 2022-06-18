let one1_star_NB = document.querySelector('.one1_star_NB')
let two2_star_NB = document.querySelector('.two2_star_NB')
let three3_star_NB = document.querySelector('.three3_star_NB')
let four4_star_NB = document.querySelector('.four4_star_NB')
let five5_star_NB = document.querySelector('.five5_star_NB')
if(one1_star_NB) {
    one1_star_NB.addEventListener("click", function() {
        one1_star_NB.style.color = "red";
        two2_star_NB.style.color = "white";
        three3_star_NB.style.color = "white";
        four4_star_NB.style.color = "white";
        five5_star_NB.style.color = "white";
    })
    two2_star_NB.addEventListener("click", function() {
        one1_star_NB.style.color = "yellow";
        two2_star_NB.style.color = "yellow";
        three3_star_NB.style.color = "white";
        four4_star_NB.style.color = "white";
        five5_star_NB.style.color = "white";
    })
    three3_star_NB.addEventListener("click", function() {
        one1_star_NB.style.color = "yellow";
        two2_star_NB.style.color = "yellow";
        three3_star_NB.style.color = "yellow";
        four4_star_NB.style.color = "white";
        five5_star_NB.style.color = "white";
    })
    four4_star_NB.addEventListener("click", function() {
        one1_star_NB.style.color = "green";
        two2_star_NB.style.color = "green";
        three3_star_NB.style.color = "green";
        four4_star_NB.style.color = "green";
        five5_star_NB.style.color = "white";
    })
    five5_star_NB.addEventListener("click", function() {
        one1_star_NB.style.color = "green";
        two2_star_NB.style.color = "green";
        three3_star_NB.style.color = "green";
        four4_star_NB.style.color = "green";
        five5_star_NB.style.color = "green";
    })
}


var xhr = new XMLHttpRequest();

function get(url, callback) {
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            var cart = JSON.parse(xhr.responseText);

            callback(null, cart);
        }
        else
            callback(true, 'something went wrong');
    }
}

let cartBtn= document.querySelector('.add_to_cart_NB');
let prodId= document.querySelector('.prodId');
cartBtn.addEventListener('click',()=>{
    get(`/cart/${prodId.textContent}`,(err,cart)=>{
        if(err)
            console.log('not able to add item to cart');
        else 
        {
            cartQtyUpdate();
        }
    });
})
let buyBtn= document.querySelector('.buy_now_NB');
buyBtn.addEventListener('click', ()=>{
    cartBtn.click()
    setTimeout(()=>{
        window.location='/cart';
    }, 1000)
});
