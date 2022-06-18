// * Login-Signup Form Animation * //

const signUpBtn= document.getElementById('signUp');
const signInBtn= document.getElementById('login');
const container= document.getElementById('container');

signUpBtn.addEventListener('click', ()=> 
container.classList.add('right-panel-active'));
signInBtn.addEventListener('click', ()=>
container.classList.remove('right-panel-active'));

// * Login-Signup Form Animation END * //