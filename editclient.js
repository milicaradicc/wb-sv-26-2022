var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
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
var table = document.getElementById("table");
var body = table.querySelector("tbody");
var cells;

table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName === "TD" && target.parentNode !== body.firstElementChild) {
        var row = target.parentNode;
        cells = row.getElementsByTagName("td");
        console.log(cells);
        var username = cells[0].innerHTML;
        var name = cells[1].innerHTML;
        console.log(name);
        var lastname = cells[2].innerHTML;
        console.log(lastname);
        var email = cells[3].innerHTML;
        console.log(email);
        var date = cells[4].innerHTML;
        var phone = cells[5].innerHTML;
        var address = cells[6].innerHTML;

        //popuni frejm
        document.getElementById("formusername").value = username;
        document.getElementById("fname").value = name;
        document.getElementById("lname").value = lastname;
        document.getElementById("formemailclient").value = email;
        document.getElementById("formdate").value = date;
        document.getElementById("formphoneclient").value = phone;
        document.getElementById("formadressclient").value = address;

        //document.getElementById("edit-form").style.display = "block";
        cells[1].innerHTML = name;
        console.log(cells[1].innerHTML);
        cells[2].innerHTML = document.getElementById("lname").value;
        
    }
});
 // Data Update Table Here
 function editTableDisplay(){
     document.querySelector('.editTable').setAttribute('style', 'display: block;')
 }



document.getElementById("editRowBtn").addEventListener("click",function(){
    var updatedUserName = document.getElementById("formusername").value;
    var updatedName = document.getElementById("fname").value;
    var updatedLastName = document.getElementById("lname").value;
    var updatedEmailClient = document.getElementById("formemailclient").value;
    var updatedDate = document.getElementById("formdate").value;
    var updatedPhoneClient = document.getElementById("formphoneclient").value;
    var updatedAdressClient = document.getElementById("formadressclient").value;

    console.log(updatedName);

    var update = true;
    var confirm = document.getElementById("popuptitle");
    confirm.innerHTML = "Registracija nije uspela!";
    var message = document.getElementById("description");
    message.innerHTML = "";

    if(updatedAdressClient === "" || updatedAdressClient === null){
        update = false;
        message = "Morate da unesete adresu";
    }
    if (!updatedPhoneClient.match(/^\d+$/)) {
        update = false;
        message.innerHTML = "Broj telefona mora da sadrzi samo cifre";
    }
    if (updatedPhoneClient === "" || updatedPhoneClient === null) {
        update = false;
        message.innerHTML = "Morate da unesete broj telefona!";
    }    
    if (!updatedDate.match(/^\d+$/)) {
        update = false;
        message.innerHTML = "Unesite validan datum";
    }
    if (updatedDate=== "" || updatedDate === null) {
        update = false;
        message.innerHTML = "Morate da unesete datum rodjenja!";
    }    
    if (updatedEmailClient === "" || updatedEmailClient === null) {
        update = false;
        message = "Morate da unesete datum rodjenja";
    }
    for(var id in users){
        userNames.push(users[id]['korisnickoIme'])
    }

    // if(userNames.includes(updatedUserName)){
    //     update = false;
    //     message.innerHTML = "Korisnicko ime je zauzeto"
    // }
    if (updatedLastName === "" || updatedLastName === null) {
        update = false;
        message.innerHTML = "Morate da unesete prezime";
    }
    if (updatedName === "" || updatedName === null) {
        update = false;
        message.innerHTML = "Morate da unesete ime";
    }
    console.log(update);
    if (update) {
        confirm.innerHTML = "Izmena uspesno izvrsena";
        message.innerHTML = "Zakazite putovanje vec danas";
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
          document.getElementsByClassName("popup")[0].classList.remove("active");
        });
        console.log(users);
        for (var id in users) {
          if (users[id]['korisnickoIme'] === updatedUserName) {
            users[id]['adresa'] = updatedAdressClient;
            users[id]['datumRodjenja'] = updatedDate;
            users[id]['email'] = updatedEmailClient;
            users[id]['ime'] = updatedName;
            users[id]['korisnickoIme'] = updatedUserName;
            users[id]['prezime'] = updatedLastName;
            users[id]['telefon'] = updatedPhoneClient;
      
            var putRequest = new XMLHttpRequest();
            putRequest.open('PUT', firebaseUrl + '/korisnici/' + id + '.json', true);
            putRequest.setRequestHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(users[id]));
            putRequest.send(JSON.stringify(users[id]));
          }
        }
      } else {
        // Neuspesna registracija
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
          document.getElementsByClassName("popup")[0].classList.remove("active");
        });
      }
      
});