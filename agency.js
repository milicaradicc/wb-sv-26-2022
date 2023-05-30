var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var queryParams = window.location.search;
var urlParams = new URLSearchParams(queryParams);
var id = urlParams.get("id");
console.log(id);

// Uzimam agenciju koju prikazujem
var agencyRequest = new XMLHttpRequest();
agencyRequest.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      var agency = JSON.parse(agencyRequest.responseText);
      console.log(agency);
      var titlename = document.getElementById("titlename");
      titlename.innerHTML = agency['naziv']

      var idForDestinations = agency['destinacije']; //id grupe destinacija
      
      // Uzimam sve destinacije za prikaz
      var destinationsRequest = new XMLHttpRequest();
      destinationsRequest.onreadystatechange = function() {
         if (this.readyState == 4) {
            if (this.status == 200) {
                var destinations = JSON.parse(destinationsRequest.responseText);
                console.log(destinations);
                document.getElementById("footeradress").innerHTML = agency['adresa'];
                document.getElementById("footeryear").innerHTML = agency['godina'];
                document.getElementById("footerphone").innerHTML = agency['brojTelefona'];
                document.getElementById("footeremail").innerHTML = agency['email'];
                for (var id in destinations) {// Check if property belongs to the object itself
                    var destination = destinations[id];
                    console.log(destination)
            
                    var original = document.getElementById("cards1");
                    var clone = original.cloneNode(true);
                    
                    clone.id = ""; 
                    original.parentNode.appendChild(clone);
            
                    var data = clone.children[0].children;
                    console.log(data)
                    var img = data[0];
                    var cardContent = data[1];
                    var title = cardContent.children[0];
                    var info = cardContent.children[1];
                    var button = cardContent.querySelector(".ctn"); 
            
                    img.src = destination['slike'][0];
                    img.alt = destination['naziv'];
                    title.innerHTML = destination['naziv'];
                    info.innerHTML = destination['opis'].substring(0, 250) + '...';
                    var urlParams = new URLSearchParams(window.location.search);
                    button.href += "?id=" + id + "&agencija=" + agency["naziv"] + "&agencijaId=" + urlParams.get('id');
                  
                }
                original.parentNode.removeChild(original.parentNode.firstChild);
                  document.getElementById("cards1").style="display:none";
            } else {
            window.location.href = "error.html";
                }
            }
        };
        destinationsRequest.open('GET', firebaseUrl + '/destinacije/' + idForDestinations + '.json');
        destinationsRequest.send();
    } else {
      window.location.href = "error.html";
    }
  }
};
agencyRequest.open('GET', firebaseUrl + '/agencije/' + id + '.json');
agencyRequest.send();
