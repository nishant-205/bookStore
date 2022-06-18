
const cart_container = document.querySelectorAll('.sub_main_container');
const top_cont= document.querySelector('.top-cont');
const main_cont=document.querySelector('.top-cont .main_container')





// ============= drop down ================
const drop_button=document.querySelectorAll(' .sub_item_container .container-1 .drop-down .drop-button button');
const drop_option=document.querySelectorAll('   .sub_item_container .container-1 .drop-down .drop-options ')
const drop_element=document.querySelectorAll('   .sub_item_container .container-1 .drop-down .drop-options a')
const drop_value=document.querySelectorAll('   .sub_item_container .container-1 .drop-down .drop-button .value')

var prev_element=0,flag=false;
for(let j=0;j<drop_button.length;j++){
    
drop_button[j].addEventListener('mousedown',()=>{
    if(flag)
    {
        if(prev_element===j)
        {
            drop_option[j].style.display='none';
            flag=false;
        }
        else
        {
            drop_option[prev_element].style.display='none';
            prev_element=j;
            drop_option[prev_element].style.display='block'
           
        }
    }
    else
    {
        flag=true;
        prev_element=j;
        drop_option[prev_element].style.display='block'

    }
    if(flag)
    {
            for(let i=0;i<drop_element.length;i++)
            {
                  drop_element[i].addEventListener('click',()=>{
                  drop_value[prev_element].textContent=drop_element[i].textContent;
                  drop_option[prev_element].style.display='none';
                  flag=false;

            })
            }

    }
})
}


// ===========================================


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
function get_forWL(url, callback) {
    console.log("sending");
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
        console.log("recieving");
        if (xhr.status === 200) {
            callback(null);
        }
        else
            callback(true);
    }
}

// =================================================





const left_button = document.querySelectorAll('.left_button');
const right_button = document.querySelectorAll(' .right_button');


const plus_btn = document.querySelectorAll(".plus");
const minus_btn = document.querySelectorAll('.minus');
const display_item_count = document.querySelectorAll('.display_item_count');
const main_container = document.querySelector('.main_container');
const empty_cart = document.querySelector('.empty_cart');
const productId = document.querySelectorAll('.productID');



for (let i = 0; i < plus_btn.length; i++) {
    plus_btn[i].addEventListener('click', () => {

        get(`/cart/${productId[i].textContent}/increase`, (err, cart) => {
            if (err) {
                console.log("error occurs during increaing the item");
            }
            else {
                display_item_count[i].textContent = `${cart.items[(productId[i].textContent)].incart}`;
                SetAmount(cart);
            }
        });


    })


}



for (let i = 0; i < minus_btn.length; i++) {
    minus_btn[i].addEventListener('click', () => {

        get(`/cart/${productId[i].textContent}/decrease`, (err, cart) => {
            if (err) {
                console.log("error occurs during decreaing the item");
            }
            else {
                if (!cart.items[(productId[i].textContent)])
                    cart_container[i].style.display = 'none';
                else
                    display_item_count[i].textContent = `${cart.items[(productId[i].textContent)].incart}`;
                SetAmount(cart);
            }
        });
    })
}



// working of remove button
for (let i = 0; i < right_button.length; i++) {
    right_button[i].addEventListener('click', () => {

        get(`/cart/${productId[i].textContent}/remove`, (err, cart) => {
            if (err) {
                console.log("error occurs during removing the item");
            }
            else {
                cart_container[i].style.display = 'none';
                SetAmount(cart);
            }
        });
    })
}
// Save for later button
for(let i=0;i<left_button.length;i++)
{
    left_button[i].addEventListener('click', ()=>{
        get_forWL(`/wl/${productId[i].textContent}`, (err)=>{
            if(err)
            {
                console.log('Error saving for later!');
            }
            else
            {
                console.log("just check");
                right_button[i].click();        //This is not executing?!
            }
        })
    })
}

    // ================
    // amount section
    // ================

    const main_amount = document.querySelectorAll('.main_amount');
    const coupon_amount = document.querySelectorAll('.coupon_amount');
    const delivary_charge = document.querySelectorAll('.delivary_charge');
    const final_amount = document.querySelectorAll('.final_amount');


    function SetAmount(cart) {
       
       
        if (cart.totalQty === 0) {
            main_container.style.display='none';
            empty_cart.textContent='Your cart is empty';
            empty_cart.style.display="block";
            cartQtyUpdate();
        }
        else 
        {
            main_amount[0].textContent=`${cart.totalPrice.toFixed(2)}`;
            final_amount[0].textContent=`${cart.totalPrice.toFixed(2)}`;
            cartQtyUpdate();
        }
    }