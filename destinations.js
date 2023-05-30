var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var destinationsID = [];
var destinations = {};
var showedID = [];

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        destinations = JSON.parse(httpRequest.responseText);
        console.log(destinations);
        for(var id in destinations){
            var destinationGroup = destinations[id]
            for(var id2 in destinationGroup){
              var destination = destinationGroup[id2];
              console.log(id)
              showedID.push(id);
              console.log(destination)
  
              var original = document.getElementById("row");
  
              var clone = original.cloneNode(true);
              clone.id = "";
              original.parentNode.appendChild(clone);
              console.log(clone);
  
              var destinationname = clone.children[0];
              console.log(clone.children[0]);
              var destinationdata = clone.children[1];
              var destinationtype = clone.children[2];
              var destinationtravel = clone.children[3];
              var destinationprice = clone.children[4];
              var destinationmax = clone.children[5];
              var destinationpicture = clone.children[6];
  
              destinationname.innerHTML=destination["naziv"];
              destinationdata.innerHTML=destination["opis"];
              destinationtype.innerHTML=destination["tip"];
              destinationtravel.innerHTML=destination["prevoz"];
              destinationprice.innerHTML=destination["cena"];
              destinationmax.innerHTML=destination["maxOsoba"];
              destinationpicture.innerHTML=destination["slike"][0];
            }
        }
        document.getElementById("row").style="display:none";
    } else {
      alert("Error occurred. Destinations could not be loaded.");
    }
  }
};
httpRequest.open("GET", firebaseUrl + "/destinacije.json");
httpRequest.send();


