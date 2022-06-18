


// * Hamburger Animation * //

    const navMenuBtn=document.querySelector('.menu');
    const navMenu=document.querySelector('.side-menu');
    let navMenuOpen=false;
    navMenuBtn.addEventListener('click',()=>{
        if(!navMenuOpen){
            navMenuBtn.classList.add('open');
            navMenu.classList.add('vis');
            navMenuOpen=true;
        }
        else{
            navMenuBtn.classList.remove('open');
            navMenu.classList.remove('vis');
            navMenuOpen=false;
        }
    })

// * Hamburger Animation END * //

// * Account Dropdown Menu Animation * //

    const accBtn=document.getElementById('acc');
    const accDrop=document.getElementById('acc-drop');
    if(accDrop) {
        accBtn.addEventListener('mouseover', () => {
            accDrop.classList.add('vis');
        })
        accBtn.addEventListener('mouseleave', () => {
            setTimeout(()=>{
                accDrop.classList.remove('vis');}, 200);
        })
    }

// * Account Dropdown Menu Animation END * //

// * Account Dropdown Menu Options Links * //
    const profLink=document.querySelectorAll('.prof-link');
    const ordLink=document.querySelectorAll('.ord-link');
    const wlLink=document.querySelectorAll('.wl-link');
    const cpnLink=document.querySelectorAll('.cpn-link');
    const addrLink=document.querySelectorAll('.addr-link');
    const rfrLink=document.querySelectorAll('.rfr-link');
    profLink.forEach(i => {
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','1');
        });
    });
    ordLink.forEach(i => {
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','2');
        });
    });
    wlLink.forEach(i =>{
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','3');
        });
    });
    cpnLink.forEach(i =>{
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','4');
        });
    });
    addrLink.forEach(i =>{
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','5');
        });
    });
    rfrLink.forEach(i =>{
        i.addEventListener('click', () =>{
            localStorage.setItem('linkNo','6');
        });
    });

    
// * Account Dropdown Menu Options Links END * //


// * Side Menu Sub Menu Script * //

    const menuTog = document.querySelectorAll('.sub-menu-tog');
    menuTog.forEach(i =>{
        i.addEventListener('click', () =>{
            i.classList.toggle('active');
            const sibling = i.nextElementSibling;
            if(sibling.style.display === 'none') {
                sibling.style.display = 'block';
            }
            else {
                sibling.style.display='none';
            }
        })
    })

// * Side Menu Sub Menu Script END * //


// * Flash Script * //

const closeFlash= document.querySelectorAll('.close-flash');
closeFlash.forEach(i=> {
    i.addEventListener('click', ()=>{
        const parent=i.parentElement;
        parent.style.display='none';
    })
})

// * Flash Script END * //

var xhr = new XMLHttpRequest();

function getForQty(url, callback) {
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

function cartQtyUpdate()
{
    getForQty(`/cart/cartQty`, (err, cart) => {
       if(err)console.log("qty"+err);
       else
       {
            const cart_Qty=document.querySelector('.cart-box .cart_Qty');
            cart_Qty.textContent=`${cart.totalQty}`;
       }
    });
    return ;
}



