var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
var agenciesID = [];
var agencies = {};
var destinations = {};

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      agencies = JSON.parse(httpRequest.responseText);
      console.log(agencies);
      fetchDestinations();
    } else {
      alert("Error occurred. Agencies could not be loaded.");
    }
  }
};
httpRequest.open("GET", firebaseUrl + "/agencije.json");
httpRequest.send();

function fetchDestinations() {
  var destinationsRequest = new XMLHttpRequest();
  destinationsRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        destinations = JSON.parse(destinationsRequest.responseText);
        console.log(destinations);
        processAgencies();
      } else {
        alert("Error occurred. Destinations could not be loaded.");
      }
    }
  };
  destinationsRequest.open("GET", firebaseUrl + "/destinacije.json");
  destinationsRequest.send();
}

function processAgencies() {
  for (var id in agencies) {
    var agency = agencies[id];
    console.log(id);

    var original = document.getElementById("row");
    var clone = original.cloneNode(true);
    clone.id = "";
    original.parentNode.appendChild(clone);

    var agencyname = clone.children[0];
    var agencyadress = clone.children[1];
    var agencyyear = clone.children[2];
    var agencyemail = clone.children[3];
    var agencyphone = clone.children[4];
    var agencydestinations = clone.children[5];
    var agencypic = clone.children[6];

    agencyname.innerHTML = agency["naziv"];
    agencyadress.innerHTML = agency["adresa"];
    agencyyear.innerHTML = agency["godina"];
    agencyemail.innerHTML = agency["email"];
    agencyphone.innerHTML = agency["brojTelefona"];
    agencypic.innerHTML = agency["logo"];

    var destinationList = [];
    console.log(destinations)
    for(var destinationID in destinations){
      console.log(destinationID)
      if(destinationID === agency['destinacije']){
        for(var dID in destinations[destinationID]){
          destinationList.push(" "+destinations[destinationID][dID]['naziv'])
        }
      }
    }
    agencydestinations.innerHTML = destinationList;
  }
  document.getElementById("row").style.display = "none";
}
