var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
var destinations = {};
var destinationsID = []
var request=new XMLHttpRequest();
var oldname;
request.onreadystatechange=function(){
    if (this.readyState == 4) {
        if (this.status == 200) {
            destinations = JSON.parse(request.responseText);
        } else {
            window.location.href = "greska.html";
        }
    }
}
request.open('GET', firebaseUrl + '/destinacije.json');
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


        var agencyname = cells[0].innerHTML;
        oldname = cells[0].innerHTML;
        var agencyadress = cells[1].innerHTML;
        var agencyyear = cells[2].innerHTML;
        var agencyemail = cells[3].innerHTML;
        var agencyphone = cells[4].innerHTML;
        var agencydest = cells[5].innerHTML.split(",").map(item => item.trim());
        console.log(agencydest);

        //popuni frejm
        document.getElementById("formagencyname").value = agencyname;
        document.getElementById("formagencyadress").value = agencyadress;
        document.getElementById("formagencyyear").value = agencyyear;
        document.getElementById("formagencyemail").value = agencyemail;
        document.getElementById("formagencyphone").value = agencyphone;
        for (var groupID in destinations) {
          for (var id in destinations[groupID]) {
             var original = document.getElementById("check");
      
             var clone = original.cloneNode(true);
             clone.id = "";
             original.parentNode.appendChild(clone);
             console.log(clone);
             clone.children[0].children[1].innerHTML = destinations[groupID][id]['naziv'];
             if (agencydest.includes(destinations[groupID][id]['naziv'])) {
                clone.children[0].children[0].checked = true;
             }else{
              clone.children[0].children[0].checked = false;
             }
          }
       }
       
       document.getElementById("check").style.display = "none";
        
    }
});
 // Data Update Table Here
 function editTableDisplay(){
     document.querySelector('.editTable').setAttribute('style', 'display: block;')
 }



document.getElementById("editRowBtn1").addEventListener("click",function(){
    var updatedagencyname = document.getElementById("formagencyname").value;
    var updatedagencyadress = document.getElementById("formagencyadress").value;
    var updatedagencyyear = document.getElementById("formagencyyear").value;
    var updatedagencyemail = document.getElementById("formagencyemail").value;
    var updatedagencyphone = document.getElementById("formagencyphone").value;

    console.log(updatedagencyname);

    var update = true;
    var message;
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(updatedagencyadress === "" || updatedagencyadress === null){
        update = false;
        message = "Morate da unesete adresu";
    }
    if (!updatedagencyphone.match(/^\d+$/)) {
        update = false;
        message = "Broj telefona mora da sadrzi samo cifre";
    }
    if (updatedagencyphone === "" || updatedagencyphone === null) {
        update = false;
        message = "Morate da unesete broj telefona!";
    }    
    if(!updatedagencyphone.match(/^[\d/]+$/)){
      update = false;
      message = "Format broja telefona nije dobar koristite brojeve i /"
    }
    if (!updatedagencyyear.match(/^\d+$/)) {
        update = false;
        message = "Unesite validnu godinu";
    }
    if (updatedagencyyear === "" || updatedagencyyear === null) {
        update = false;
        message = "Morate da unesete datum rodjenja!";
    } 
    if (!re.test(updatedagencyemail)) {
        signIn = false;
        message.innerHTML = "Email nije ispravan";
    }   
    if (updatedagencyemail === "" || updatedagencyemail === null) {
        update = false;
        message = "Morate da unesete email";
    }
    if (updatedagencyname === "" ||  updatedagencyname === null) {
        update = false;
        message = "Morate da unesete naziv agencije";
    }
    for(var id in destinations){
      destinationsID.push(destinations[id]['korisnickoIme'])
    }

    if(destinationsID.includes(updatedagencyname) && updatedagencyname != oldname){
        update = false;
        message  = "Vec postoji agencija sa ovim imenom"
    }

    console.log(update);
    if (update) {
        message = "Refresujte stranicu";
        document.getElementById("description4").innerHTML = message;
        document.getElementById("proslo1").classList.add("active");
        document.getElementById("dismiss-popup-btn0.1").addEventListener("click", function() {
          document.getElementsByClassName("popup")[0].classList.remove("active");
        });
        console.log(oldname);
        for (var id in destinations) {
          if (destinations[id]['naziv'] === oldname) {
            destinations[id]['adresa'] = updatedagencyadress;
            destinations[id]['brojTelefona'] = updatedagencyphone;
            destinations[id]['email'] = updatedagencyemail;
            destinations[id]['naziv'] = updatedagencyname;
            destinations[id]['godina'] = updatedagencyyear;
      
            var putRequest = new XMLHttpRequest();
            putRequest.open('PUT', firebaseUrl + '/agencije/' + id + '.json', true);
            putRequest.setRequestHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(destinations[id]));
            putRequest.send(JSON.stringify(destinations[id]));
          }
        }
      } else {
        // Neuspesna registracija
        document.getElementById("description5").innerHTML = message;
        document.getElementById("nijeProslo1").classList.add("active");
        console.log(document.getElementsByClassName("popup"));
        document.getElementById("dismiss-popup-btn1.1").addEventListener("click", function() {
            document.getElementsByClassName("popup")[1].classList.remove("active");
        });
      }
      
});


table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("delete-btn-agency")) {
      var row = target.parentNode.parentNode;
      console.log(row);
  
      // Prikazivanje potvrde brisanja korisnika (popup-a)
      document.getElementById("areYouSure1").classList.add("active");

      // Dugme za odbijanje potvrde brisanja
      document.getElementById("dismiss-popup-btn2.1").addEventListener("click", function() {
        document.getElementsByClassName("popup")[2].classList.remove("active");
      });
  
      // Dugme za potvrdu brisanja
      document.getElementById("ok-popup-btn0.1").addEventListener("click", function() {
        document.getElementsByClassName("popup")[2].classList.remove("active");
        console.log(document.getElementsByClassName("popup"));

        // Inicijalizacija XMLHttpRequest objekta
        var httpRequest = new XMLHttpRequest();
        console.log(destinations);
        for(var id in destinations) {
          console.log(id);
          if (destinations[id]['naziv'] === row.children[0].textContent) {
            console.log(id);
            httpRequest.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  // Obrada uspešnog brisanja korisnika
                  console.log(document.getElementsByClassName("popup"));
                  document.getElementById("obrisano1").classList.add("active");
                  document.getElementById("dismiss-popup-btn3.1").addEventListener("click", function() {
                    document.getElementsByClassName("popup")[3].classList.remove("active");
                  });
                  row.parentNode.removeChild(row);
                } else {
                  window.location.href = "greska.html";
                }
              }
            };
  
            httpRequest.open('DELETE', firebaseUrl + '/agencije/' + id + '.json');
            httpRequest.send();
          }
        }
      });
    }
  });
  
  table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("create")) {
      var row = target.parentNode.parentNode;
      console.log(row);
  
      // Prikazivanje potvrde brisanja korisnika (popup-a)
      document.getElementById("kreiraj").classList.add("active");

    }
  });