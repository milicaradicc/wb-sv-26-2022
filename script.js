var firebaseUrl="https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

import { initializeApp } from 'firebase/app';
import { getDatabase , set, get, update, remove, ref, child } from 'firebase/database';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional\
// preko ovog objekta se povezuje
const firebaseConfig = {
    apiKey: "AIzaSyAcXSl0wCQjZ4CxOjrJ9Sd96AdwjpFb_4Q",
    authDomain: "webprojekat-5430f.firebaseapp.com",
    databaseURL: "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webprojekat-5430f",
    storageBucket: "webprojekat-5430f.appspot.com",
    messagingSenderId: "900509189095",
    appId: "1:900509189095:web:4824d1ab249823d544b342",
    measurementId: "G-075EK3P508"
  };
// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

//-----------------------------------------------------------------------------------
//login and signin
//-----------------------------------------------------------------------------------
const dataBase = getData(); //moze da uzme podatke bilo odakle iz htmla
var logInButton = document.getElementById('getLogIn');
var signInButton = document.getElementById('getSignIn');

var enterUserName = document.querySelector("#enterUserName") //pronaci ce nesto iz htmla po id
var enterPassword = document.querySelector("#enterPassword")

var getName = document.querySelector("#getName")
var getLastName = document.querySelector("#getLastName")
var getEmail = document.querySelector("#getEmail")
var getDate = document.querySelector("#getDate")
var getAdress = document.querySelector("#getAdress")
var getPhone = document.querySelector("#getPhone") 
var getUserNameSignIn= document.querySelector("#getUserNameSignIn") 
var getPasswordSignIn= document.querySelector("#getPasswordSignIn")

function LogIn(){

}
function SignIn(){
    set(ref(dataBase, "korisnici/"),{
        Name: getName.value,
        LastName: getLastName.value,
        Email: getEmail.value,
        DateOfBirth: getDate.value,
        Adress: getAdress.value,
        Phone: getPhone.value,
        UserName: getUserNameSignIn.value,
        Password: getPasswordSignIn
    })
    .then(()=>{
        alert("data added successfully")
    })
    .catch((error)=>{
        alert(error)
    });
}

logInButton.addEventListener('submit',LogIn);
signInButton.addEventListener('submit',SignIn); 