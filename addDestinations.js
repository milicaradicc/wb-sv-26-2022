var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
var row;
var requestCounter = 0;
function registerAgency() {
  var agencies = {};
  var destinations = {};
  
  var rrequest = new XMLHttpRequest();
  rrequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        destinations = JSON.parse(rrequest.responseText);
        handleData();
      } else {
        window.location.href = "error.html";
      }
    }
  };
  rrequest.open('GET', firebaseUrl + '/destinacije.json');
  rrequest.send();

  var arrequest = new XMLHttpRequest();
  arrequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        agencies = JSON.parse(arrequest.responseText);
        handleData();
      } else {
        window.location.href = "error.html";
      }
    }
  };
  arrequest.open('GET', firebaseUrl + '/agencije.json');
  arrequest.send();

  function handleData() {

    requestCounter++;

    if (requestCounter < 2) {
      return;
    }

    console.log(destinations);
    console.log(agencies);

    var createagency = document.getElementById("createagency").value;
    var createname = document.getElementById("createname").value;
    var createdata = document.getElementById("createdata").value;
    var createtype = document.getElementById("createtype").value;
    var createmax = document.getElementById("createmax").value;
    var createpic = document.getElementById("createpic").value;
    var createprice = document.getElementById("createprice").value;
    var createtransport = document.getElementById("createtransport").value;

    var create = true;
    var message;
    var destinationGroup;

    var list = [];

    for (var id in agencies) {
      list.push(agencies[id]['naziv']);
      if (agencies[id]['naziv'] === createagency) {
        destinationGroup = agencies[id]['destinacije'];
      }
    }

    if (!list.includes(createagency)) {
      create = false;
      message = "Unesite postojecu agenciju";
    }
    if (!createmax.match(/^\d+$/)) {
      create = false;
      message = "Broj telefona mora da sadrzi samo cifre";
    }
    if (!createprice.match(/^\d+$/)) {
      create = false;
      message = "Cena mora da sadrzi samo cifre";
    }
    var pattern = /\.(jpeg|jpg|gif|png)$/i;
    if (!pattern.test(createpic)) {
      create = false;
      message = "Unesite sliku";
    }
    if (createpic === "" || createpic === null) {
      create = false;
      message = "Morate da unesete sliku";
    }
    if (createprice === "" || createprice === null) {
      create = false;
      message = "Morate da unesete cenu";
    }
    if (createtransport === "" || createtransport === null) {
      create = false;
      message = "Morate da unesete prevoz";
    }
    if (createmax === "" || createmax === null) {
      create = false;
      message = "Morate da unesete maksimalan broj osoba";
    }
    if (createtype === "" || createtype === null) {
      create = false;
      message = "Morate da unesete tip ";
    }
    if (createdata === "" || createdata === null) {
      create = false;
      message = "Morate da unesete opis";
    }
    if (createname === "" || createname === null) {
      create = false;
      message = "Morate da unesete destinacije";
    }
    if (createagency === "" || createagency === null) {
      create = false;
      message = "Morate da unesete ime agencije";
    }

    if (create) {
      var confirm = "Uspesno ste se kreirali destinaciju";
      document.getElementById("popuptitle1").innerHTML = confirm;
      document.getElementById("proslo1").classList.add("active");
      document.getElementById("dismiss-popup-btn0.1").addEventListener("click", function() {
        document.getElementsByClassName("popup")[2].classList.remove("active");
      });

      var newDest = {
        'naziv': createname,
        'opis': createdata,
        'tip': createtype,
        'maxOsoba': createmax,
        'slike': createpic,
        'cena': createprice,
        'prevoz': createtransport
      };

      row.children[5].textContent += ', ' + newDest['naziv'];

      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            console.log("Uspesno");
          } else {
            window.location.href = "error.html";
          }
        }
      };
      request.open('POST', firebaseUrl + '/destinacije/' + destinationGroup + '.json');
      request.send(JSON.stringify(newDest));
    } else {
      document.getElementById("popuptitle1").innerHTML = "Registracija nije uspela";
      document.getElementById("description5").innerHTML = message;
      document.getElementById('nijeProslo1').classList.add("active");
      document.getElementById("dismiss-popup-btn1.1").addEventListener("click", function() {
        document.getElementsByClassName("popup")[3].classList.remove("active");
      });
    }
  }
}
