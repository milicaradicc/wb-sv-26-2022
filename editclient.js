var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
var users = {};
var userNames = []
var request=new XMLHttpRequest();
var oldusername;
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
        oldusername = cells[0].innerHTML;
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
    var message;

    if(updatedAdressClient === "" || updatedAdressClient === null){
        update = false;
        message = "Morate da unesete adresu";
    }
    if (!updatedPhoneClient.match(/^\d+$/)) {
        update = false;
        message = "Broj telefona mora da sadrzi samo cifre";
    }
    if (updatedPhoneClient === "" || updatedPhoneClient === null) {
        update = false;
        message = "Morate da unesete broj telefona!";
    }    
    if (!updatedDate.match(/^\d+$/)) {
        update = false;
        message = "Unesite validan datum";
    }
    if (updatedDate=== "" || updatedDate === null) {
        update = false;
        message = "Morate da unesete datum rodjenja!";
    }    
    if (updatedEmailClient === "" || updatedEmailClient === null) {
        update = false;
        message = "Morate da unesete datum rodjenja";
    }
    for(var id in users){
        userNames.push(users[id]['korisnickoIme'])
    }

    if(userNames.includes(updatedUserName) && updatedUserName != oldusername){
        update = false;
        message  = "Korisnicko ime je zauzeto"
    }
    if (updatedLastName === "" || updatedLastName === null) {
        update = false;
        message = "Morate da unesete prezime";
    }
    if (updatedName === "" || updatedName === null) {
        update = false;
        message = "Morate da unesete ime";
    }
    console.log(update);
    if (update) {
        message = "Zakazite putovanje vec danas";
        document.getElementById("description").innerHTML = message;
        document.getElementById("proslo").classList.add("active");
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
        document.getElementById("description1").innerHTML = message;
        document.getElementById("nijeProslo").classList.add("active");
        document.getElementById("dismiss-popup-btn1").addEventListener("click", function() {
            document.getElementsByClassName("popup")[1].classList.remove("active");
        });
      }
      
});


table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("delete-btn-client")) {
      var row = target.parentNode.parentNode;
      console.log(row);
  
      // Prikazivanje potvrde brisanja korisnika (popup-a)
      document.getElementById("areYouSure").classList.add("active");
  
      // Dugme za odbijanje potvrde brisanja
      document.getElementById("dismiss-popup-btn2").addEventListener("click", function() {
        document.getElementsByClassName("popup")[2].classList.remove("active");
      });
  
      // Dugme za potvrdu brisanja
      document.getElementById("ok-popup-btn").addEventListener("click", function() {
        document.getElementsByClassName("popup")[2].classList.remove("active");
        
        // Inicijalizacija XMLHttpRequest objekta
        var httpRequest = new XMLHttpRequest();
  
        for (var id in users) {
          if (users[id]['korisnickoIme'] === row.children[0].textContent) {
            console.log(id);
            httpRequest.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  // Obrada uspešnog brisanja korisnika
                  document.getElementById("obrisano").classList.add("active");
                  document.getElementById("dismiss-popup-btn3").addEventListener("click", function() {
                    document.getElementsByClassName("popup")[3].classList.remove("active");
                  });
                  row.parentNode.removeChild(row);
                } else {
                  window.location.href = "greska.html";
                }
              }
            };
  
            httpRequest.open('DELETE', firebaseUrl + '/korisnici/' + id + '.json');
            httpRequest.send();
          }
        }
      });
    }
  });
  


// var red = dugme.parentNode.parentNode; // Dohvati roditeljski red dugmeta
// red.parentNode.removeChild(red)