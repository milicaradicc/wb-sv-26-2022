var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var agenciesID = [];
var agencies = {};

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        agencies = JSON.parse(httpRequest.responseText);
        console.log(agencies)
        for(var id in agencies){
            var agency = agencies[id]
            console.log(id)

            var original = document.getElementById("row");

            var clone = original.cloneNode(true);
            clone.id = "";
            original.parentNode.appendChild(clone);

            var agencyname = clone.children[0];
            var agencyadress = clone.children[1];
            var agencyyear = clone.children[2];
            var agencyemail = clone.children[3];
            var agencyphone = clone.children[4];
            var deletebtn = clone.children[5];

            agencyname.innerHTML=agency["naziv"];
            agencyadress.innerHTML=agency["adresa"];
            agencyyear.innerHTML=agency["godina"];
            agencyemail.innerHTML=agency["email"];
            agencyphone.innerHTML=agency["brojTelefona"];
        }
        document.getElementById("row").style="display:none";
    } else {
      alert("Error occurred. Agencies could not be loaded.");
    }
  }
};
httpRequest.open("GET", firebaseUrl + "/agencije.json");
httpRequest.send();


