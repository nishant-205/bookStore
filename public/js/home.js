var slide = document.querySelectorAll(".container");//slider

var cards = document.querySelectorAll(".slider .card");
var pre = document.querySelectorAll(".pre"); //buttons
var next = document.querySelectorAll(".next");//buttons

var count = 0; // count the index of first image which is seen in the screen
let isdown = false;// check whether the click is done or not

let startx;  // hold the starting coordinate of the click .....x-axis
let scrollLeft;//starting scroll value at each click
var size;// size of each image 



for(let i=0;i<slide.length;i++){
slide[i].addEventListener("mousedown", (e) => {


    slide[i].style.scrollBehavior = 'unset';

    var style = cards[i].currentStyle || window.getComputedStyle(cards[i]),
        width = cards[i].offsetWidth, // or use style.width
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    size = (width + margin - padding + border);



    // size = 272;
    // console.log(size);
    isdown = true;
   



    startx = e.pageX - slide[i].offsetLeft;
    scrollLeft = slide[i].scrollLeft;
    e.preventDefault();
})

}
for(let i=0;i<slide.length;i++){
slide[i].addEventListener("mouseleave", () => {
    if (!isdown)
        return;
    adjust_last_image(i);
    isdown = false;


})
}


for(let i=0;i<slide.length;i++){
slide[i].addEventListener("mouseup", () => {
    adjust_last_image(i);
    isdown = false;


})
}


for(let i=0;i<slide.length;i++){
slide[i].addEventListener("mousemove", (e) => {
    if (!isdown)
        return;
    const walk = e.pageX - startx;// how much mouse move from the point of click

    slide[i].scrollLeft = (scrollLeft - walk); // scroll value relative to starting scroll value 
    // and updating the new scroll value

    // console.log(slide[i].scrollLeft)

    count = ((slide[i].scrollLeft - slide[i].offsetLeft) / size);
    // console.log(count)



})
}


function adjust_last_image(i) {

    //this adjust the first image which may be not at perfect position 


    count = Math.round((slide[i].scrollLeft) / size);
    var cur_count = slide[i].scrollLeft / size;

    slide[i].scrollLeft = size * count;
    //here the transition need to be applied


}




//-----------------------------------------------------------------------------------------
////////////////////buttons ///////////////////

for(let i=0;i<slide.length;i++){
next[i].addEventListener("mouseover",()=>{
  
    next[i].style.cursor="pointer";

});
}


for(let i=0;i<slide.length;i++){
pre[i].addEventListener("mouseover",()=>{
    pre[i].style.cursor="pointer";

});
}

for(let i=0;i<slide.length;i++){
next[i].addEventListener("click", () => {

    var style = cards[i].currentStyle || window.getComputedStyle(cards[i]),
        width = cards[i].offsetWidth, // or use style.width
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    size = (width + margin - padding + border);




    count = Math.round((slide[i].scrollLeft) / size);

    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;


    
    if (width > 1112)
        count += 4;
    else if(width>850)
        count+3;
    else if (width > 360)
        count += 2;
    else count += 1;

    
    slide[i].style.scrollBehavior = 'smooth';
    slide[i].scrollLeft = size * count;
    
    //here the transition need to be applied
});
}


for(let i=0;i<slide.length;i++){
pre[i].addEventListener("click", () => {
    
    var style = cards[i].currentStyle || window.getComputedStyle(cards[i]),
        width = cards[i].offsetWidth, // or use style.width
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    size = (width + margin - padding + border);

    count = Math.round((slide[i].scrollLeft) / size);

    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;



    if (width > 1112)
        count -= 4;
    else if (width > 360)
        count -= 2;
    else count -= 1;



    
    slide[i].style.scrollBehavior = 'smooth';

    slide[i].scrollLeft = size * count;


    //here the transition need to be applied
})
}


// ====================== touches for mobile display===============================



// =============================================================================================================

// ----- image slider start--------

var img_slider = document.querySelector(".carousel-slider-img");
var img_img = document.querySelectorAll(".carousel-slider-img img");
var img_pre = document.querySelector("#pre-img");
var img_next = document.querySelector("#next-img");



var img_count = 1;



showslide();




function showslide() {


    if (img_count >= img_img.length)
        img_count = 0;

    for (var i = 0; i < img_img.length; i++)
        img_img[i].style.display = "none";


    img_img[img_count].style.display = "block"
    img_count++;

    // console.log(count)

}

var timmer = setInterval(showslide, 4000);

img_next.addEventListener('click', () => {
    //    console.log('sakdn');
    clearInterval(timmer);
    showslide();
    timmer = setInterval(showslide, 4000);
    //  console.log(+timmer);


});

img_pre.addEventListener('click', () => {


    clearInterval(timmer);

    img_count -= 2;
    if (img_count < 0)
        img_count = img_img.length - 1;

    showslide();
    timmer = setInterval(showslide, 4000);

});

img_next.addEventListener("mouseover",()=>{
  
    img_next.style.cursor="pointer";

});

img_pre.addEventListener("mouseover",()=>{
    img_pre.style.cursor="pointer";

});






// ============
// for add to cart functionality
// ============

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


const cart=document.querySelectorAll('.bot .cart');
const productId=document.querySelectorAll('.bot .productId');

for(let i=0;i<cart.length;i++)
{
    cart[i].addEventListener('click',()=>{

        get(`/cart/${productId[i].textContent}`,(err,cart)=>{
            if(err)
            console.log('not able to add item to cart');
            else 
            {
                  cartQtyUpdate();   
            }
        });
    })
}



const bookmark=document.querySelectorAll('.bot .bookmark');
for(let i=0;i<bookmark.length;i++)
{
    bookmark[i].addEventListener('click',()=>{
        get(`/wl/${productId[i].textContent}`,(err)=>{
            if(err)
                console.log('not able to add item to wishlist');
        });
    })
}