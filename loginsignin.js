var firebaseUrl="https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var users = {};
var userNames = []
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if (this.readyState == 4) {
        if (this.status == 200) {
            users = JSON.parse(request.responseText);
        } else {
            window.location.href = "greska.html";
        }
    }
}
request.open('GET', firebaseUrl + '/korisnici.json');
request.send();
//--------------------------------------------------------------------------------
// SIGNIN
//--------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formsignin").addEventListener("submit", function(event) {
    event.preventDefault();

    var getName = document.getElementById("getName").value;
    var getLastName = document.getElementById("getLastName").value;
    var getEmail = document.getElementById("getEmail").value;
    var getDate = document.getElementById("getDate").value;
    var getAdress = document.getElementById("getAdress").value;
    var getPhone = document.getElementById("getPhone").value;
    var getUserNameSignIn = document.getElementById("getUserNameSignIn").value;
    var getPasswordSignIn = document.getElementById("getPasswordSignIn").value;

    var signIn = true;
    var confirm = document.getElementById("popuptitle");
    confirm.innerHTML = "Registracija nije uspela!";
    var message = document.getElementById("description");
    message.innerHTML = "";

    for(var id in users){
        userNames.push(users[id]['korisnickoIme'])
    }

    if(userNames.includes(getUserNameSignIn)){
        signIn = false;
        message.innerHTML = "Korisnicko ime je zauzeto"
    }
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (getPasswordSignIn.length < 8) {
        signIn = false;
        message.innerHTML = "Lozinka mora da sadrzi barem osam karaktera";
    } 
    if (getPasswordSignIn === "" || getPasswordSignIn === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete lozinku";
    }
    if (getUserNameSignIn === "" || getUserNameSignIn === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete korisnicko ime";
    }
    if (!getPhone.match(/^\d+$/)) {
        signIn = false;
        message.innerHTML = "Broj telefona mora da sadrzi samo cifre";
    }
    if (getPhone === "" || getPhone === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete broj telefona!";
    }     
    if (getAdress === "" || getAdress === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete adresu";
    }
    if(getDate === "" || getDate === null){
        signIn = false;
        message.innerHTML = "Morate da unesete datum rodjenja"
    }
    if (!re.test(getEmail)) {
        signIn = false;
        message.innerHTML = "Email nije ispravan";
    }
    if (getEmail === "" || getEmail === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete email";
    }
    if (getLastName === "" || getLastName === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete prezime";
    }
    if (getName === "" || getName === null) {
        signIn = false;
        message.innerHTML = "Morate da unesete ime";
    }

      if (signIn) {
        // Uspesna registracija
        confirm.innerHTML = "Uspesno ste se registrovali";
        message.innerHTML = "Zakazite putovanje vec danas";
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss").addEventListener("click",function(){
            document.getElementsByClassName("popup")[0].classList.remove("active");
        })
        
        newUser={
            "adresa":getAdress,
            "datumRodjenja":getDate,
            "email":getEmail,
            "ime":getName,
            "korisnickoIme":getUserNameSignIn,
            "lozinka":getPasswordSignIn,
            "prezime":getLastName,
            "telefon":getPhone,
        }

        request.onreadystatechange=function(){
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log("uspesno");
                } else {
                    window.location.href = "error.html";
                }
            }
            }
            request.open('POST', firebaseUrl + '/korisnici.json');
            request.send(JSON.stringify(newUser));



      } else {
        // Neuspesna registracija
        document.getElementById('fail').classList.add("active");
        document.getElementById("dismiss1").addEventListener("click",function(){
            document.getElementsByClassName("popup")[1].classList.remove("active");
        })
      }
    });
  });

//--------------------------------------------------------------------------------
//LOGIN
//--------------------------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formlogin").addEventListener("submit", function(event) {
      event.preventDefault();
        console.log(users)
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;

    for(var id in users){
        userNames.push(users[id]["korisnickoIme"])
    }

    var login = true;
    var confirm = document.getElementById("popuptitle");
    confirm.innerHTML = "Prijava nije uspela";
    var message = document.getElementById("description");
    message.innerHTML = "";


    if (password === "" || password === null) {
        login = false;
        message.innerHTML = "Morate da unesete lozinku";
    }
    if (username === "" || username === null) {
        login = false;
        message.innerHTML = "Morate da unesete korisnicko ime";
    }
    if(!userNames.includes(username)){
        login = false;
        message.innerHTML = "Nepostojece korisnicko ime"
    }
    for(var id in users){
        if(users[id]['korisnickoIme'] === username && users[id]['lozinka'] != password){
            login = false;
            message.innerHTML = "Pogresna lozinka"
        }
    }

      if (login) {
        confirm.innerHTML = "Uspesno ste se prijavili";
        message.innerHTML = "Zakazite putovanje vec danas";
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
            document.getElementsByClassName("popup")[0].classList.remove("active");
        })
      } else {
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
            document.getElementsByClassName("popup")[0].classList.remove("active");
        })
      }
    });
  });
