// * Profile Page Script * //

// const e = require("express");

    
const profBtn=document.getElementById('l-prof');
const ordBtn=document.getElementById('l-ord');
const wlBtn=document.getElementById('l-wl');
const cpnBtn=document.getElementById('l-cpn');
const addrBtn=document.getElementById('l-addr');
const rfrBtn=document.getElementById('l-rfr');

function profTabs (ID1,ID2) {
    var content=document.querySelectorAll('.acc-cont .right');
    var tabs=document.getElementsByClassName('item');
    for(var i=0;i<content.length;++i) {
        content[i].style.display='none';
    }
    for(var i=0;i<tabs.length;++i) {
        tabs[i].classList.remove('active');
    }
    document.getElementById(ID1).classList.add('active');
    document.getElementById(ID2).style.display='block';
}
profBtn.addEventListener('click', () =>{
    profTabs('l-prof','r-prof');
});
ordBtn.addEventListener('click', () =>{
    profTabs('l-ord','r-ord');
});
wlBtn.addEventListener('click', () =>{
    profTabs('l-wl','r-wl');
});
cpnBtn.addEventListener('click', () =>{
    profTabs('l-cpn','r-cpn');
});
addrBtn.addEventListener('click', () =>{
    profTabs('l-addr','r-addr');
});
rfrBtn.addEventListener('click', () =>{
    profTabs('l-rfr','r-rfr');
});



var xhr = new XMLHttpRequest();

function get(url, callback) {
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            var addr = JSON.parse(xhr.responseText);
            
            callback(null, addr);
        }
        else
            callback(true, 'something went wrong');
    }
}


function getforwl(url, callback) {
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            var addr = JSON.parse(xhr.responseText);
            
            callback(null, addr);
        }
        else
            callback(true, 'something went wrong');
    }
}

// * Profile Div Script * //

const changePassLink=document.querySelector('.chng-pass-link');
const changePassForm=document.querySelector('.change-pass');
changePassLink.addEventListener('click', ()=>{
    if(changePassForm.style.display==='none')
        changePassForm.style.display='block';
    else
        changePassForm.style.display='none';
})


// * Profile Div Script END * //


// * Wishlist Div Script * //

const removeWl= document.querySelectorAll('.wl-cont .item-cont .remove');
const productId=document.querySelectorAll('.wl-cont .item-cont .product_id');
const addCart= document.querySelectorAll('.wl-cont .item-cont .cart');
for(let i=0;i<removeWl.length;i++)
{
    removeWl[i].addEventListener('click',()=>{
        removeWl[i].parentElement.parentElement.style.display='none';
        console.log(productId[i].textContent);
        get(`/wl/remove/${productId[i].textContent}`, (err)=>{
            if(err)
               { console.log('removing item failed'); }
            else
                console.log(removeWl[i]);
        })
    })
}
for(let i=0;i<addCart.length;i++)
{
    addCart[i].addEventListener('click',()=>{
        addCart[i].parentElement.parentElement.style.display='none';
        // get(`/cart/${productId[i].textContent}`, async (err,cart) =>{
        //     if(err)
        //         { console.log('adding to cart failed'); }
        //     else {
        //         await removeWl[i].click();
        //         cartQtyUpdate();
        //     }
        // })
        getforwl(`/cart/${productId[i].textContent}`)
            .then(()=>{
                removeWl[i].click()
                .then(()=>{
                    cartQtyUpdate();
                })
                .catch((err)=>{
                    console.log('remove and add to cart'+err);
                })
            })
            .catch((err)=>{
                console.log('move to cart and qty update' + err);
            })
    })
}

// * Wishlist Div Script END * //

// * Address Div Script * //      

const editAddrLink=document.querySelectorAll('.addr-box .icon');
const newAddrLink=document.querySelector('#new-addr div');
const addrCont=document.querySelector('.addr-cont');
const addrForm=document.querySelector('.addr-form');
const addrEditForm=document.querySelector('.addr-edit');
var addrID;
// Edit Form 
editAddrLink.forEach(i => {
    i.addEventListener('click', ()=> {
        const sibling= i.nextElementSibling;
        addrID= sibling.innerHTML;
        addrCont.style.display='none';
        addrEditForm.style.display='block';
        get(`profile/editaddress/${addrID}`, (err, addr) => {
            if (err) {
                console.log("Error "+ err);
            }
            else {
                const inputs =document.querySelectorAll('.addr-edit input');
                inputs[0].value=addr.fname;
                inputs[1].value=addr.lname;
                inputs[2].value=addr.hno;
                inputs[3].value=addr.street;
                inputs[4].value=addr.city;
                inputs[5].value=addr.pcode;
                inputs[6].value=addr.state;
                inputs[7].value=addr.country;
                inputs[8].value=addr.mno;
                inputs[9].checked=addr.isDefault;
                inputs[10].value=addr._id;
            }
        });
    })
});
// Add New Address Form
newAddrLink.addEventListener('click', ()=> {
    addrCont.style.display='none';
    addrForm.style.display='block';
})
// Delete Button
const delBtn=document.getElementById('del');
const form=document.querySelector('.addr-edit form');
delBtn.addEventListener('click', ()=>{
    form.action='addr-del';
})
// Close Button
const closeBtn=document.querySelectorAll('.close-btn');
closeBtn.forEach(element => {
    element.addEventListener('click', ()=>{
        addrForm.style.display='none';
        addrEditForm.style.display='none';
        addrCont.style.display='block';
    })
}); 

// * Address Div Script END * //


// * Profile Page Script END * //