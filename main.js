var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var agenciesID = [];
var agencies = {};

const httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      agencies = JSON.parse(httpRequest.responseText);
      console.log(agencies)
      for (var id in agencies) {
        var agency = agencies[id];

        console.log(id);

        var original = document.getElementById("cards");

        var clone = original.cloneNode(true);
        clone.id = "";
        original.parentNode.appendChild(clone);

        var data = clone.children[0].children;
        var icon = data[0];
        var cardContent = data[1];
        var title = cardContent.children[0];
        var list = cardContent.children[1];
        var adress = list.children[0];
        var year = list.children[1];
        var phone = list.children[2];
        var email = list.children[3];
        var card = document.querySelector(".cards");
        var button = cardContent.querySelector(".ctn"); // Use querySelector to select the button        
        icon.src = agency["logo"];
        icon.alt = agency["naziv"];

        title.innerHTML = agency["naziv"];
        email.innerHTML = agency["email"];
        phone.innerHTML = agency["brojTelefona"];
        adress.innerHTML = agency["adresa"];
        year.innerHTML = agency["godina"];
        button.href = "agency_page.html?id=" + id;
        card.href = "agency_page.html?id=" + id;

        agenciesID.push(id);
      }
      document.getElementById("cards").style="display:none";
    } else {
      alert("Error occurred. Agencies could not be loaded.");
    }
  }
};

httpRequest.open("GET", firebaseUrl + "/agencije.json");
httpRequest.send();