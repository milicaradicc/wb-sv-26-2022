var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var queryParams = window.location.search;
var urlParams = new URLSearchParams(queryParams);
var id = urlParams.get("agencijaId");
var agencies = {};
var destinations = {};
console.log(id);


var agencyRequest = new XMLHttpRequest();
agencyRequest.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      var agency = JSON.parse(agencyRequest.responseText);
      console.log(agency);

      var urlParams = new URLSearchParams(window.location.search);
      var destinationId=urlParams.get('id');
      console.log(destinationId);

      var destinationsRequest = new XMLHttpRequest();
                        destinationsRequest.onreadystatechange = function() {
                            if (this.readyState == 4) {
                                if (this.status == 200) {
                                    var destination = JSON.parse(destinationsRequest.responseText);
                                    console.log(destination);

                                    document.getElementById("main").innerHTML = destination['naziv'];
                                    document.getElementById("tekst").innerHTML = destination['opis'];
                                    document.getElementById("tip").innerHTML = destination['tip'];
                                    document.getElementById("prevoz").innerHTML = destination['prevoz'];
                                    document.getElementById("cena").innerHTML = destination['cena'];
                                    document.getElementById("maxosoba").innerHTML = destination['maxOsoba'];
                                    for(var pic in destination['slike']){
                                        console.log(pic);
                                        var original = document.getElementById("slika");
                                        console.log(original);
                                        var clone = original.cloneNode(true);
                                        clone.id = "";
                                        original.parentNode.appendChild(clone);

                                        var data = clone.children[0];

                                        console.log(data);

                                        data.src = destination['slike'][pic];
                                    }
                                    document.getElementById("slika").style="display:none";


                                } else {
                                window.location.href = "error.html";
                                    }
                                }
                            }
                            destinationsRequest.open('GET', firebaseUrl + '/destinacije/'+ agency["destinacije"] + "/"+destinationId +'.json');
                            destinationsRequest.send();
    } else {
      window.location.href = "error.html";
        }
    }
  }
    agencyRequest.open('GET', firebaseUrl + '/agencije/' + id + '.json');
    agencyRequest.send();
