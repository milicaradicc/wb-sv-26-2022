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
        var name = cells[0].innerHTML;
        var data = cells[1].innerHTML;
        var type = cells[2].innerHTML;
        var travel = cells[3].innerHTML;
        var price = cells[4].innerHTML;
        var max = cells[5].innerHTML;
        var picture = cells[6].innerHTML;
        //popuni frejm
        document.getElementById("formnamedestination").value = name;
        document.getElementById("formdatadestination").value = data;
        document.getElementById("formtypedestination").value = type;
        document.getElementById("formtraveldestination").value = travel;
        document.getElementById("formpricedestination").value = price;
        document.getElementById("formmaxdestination").value = max;
        document.getElementById("formpicturedestination").value = picture;
        
    }
});
 // Data Update Table Here
 function editTableDisplay(){
     document.querySelector('.editTable').setAttribute('style', 'display: block;')
 }



document.getElementById("editRowBtnn").addEventListener("click",function(){
    var updatedname = document.getElementById("formnamedestination").value;
    var updateddata = document.getElementById("formdatadestination").value;
    var updatedtype = document.getElementById("formtypedestination").value;
    var updatedtravel = document.getElementById("formtraveldestination").value;
    var updatedprice = document.getElementById("formpricedestination").value;
    var updatedmax = document.getElementById("formmaxdestination").value;
    var updatedpicture = document.getElementById("formpicturedestination").value;

    var update = true;
    var message;
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var pattern = /\.(jpeg|jpg|gif|png)$/i;

    if(!pattern.test(updatedpicture)){
      create = false;
      message = "Unesite sliku"
    }
    if(updatedpicture === "" || updatedpicture === null){
        update = false;
        message = "Morate da unesete sliku";
    }
    if (!updatedmax.match(/^\d+$/)) {
        update = false;
        message = "Maksimalan broj osoba mora da sadrzi samo brojeve";
    }
    if (!updatedprice.match(/^\d+$/)) {
        update = false;
        message = "Cena mora da sadrzi samo cifre";
    }
    if (updatedprice === "" || updatedprice === null) {
        update = false;
        message = "Morate da unesete cenu";
    }    
    if (updatedmax === "" || updatedmax === null) {
        update = false;
        message = "Morate da unesete maskimalan broj osoba";
    }    
    if (updatedtravel === "" || updatedtravel === null) {
        update = false;
        message = "Morate da unesete sredstvo prevoza!";
    }    
    if (updatedtype=== "" || updatedtype=== null) {
        update = false;
        message = "Morate da unesete tip!";
    }   
    if (updateddata === "" || updateddata === null) {
        update = false;
        message = "Morate da unesete opis destinacije";
    }
    if (updatedname === "" ||  updatedname === null) {
        update = false;
        message = "Morate da unesete naziv destinacije";
    }

    console.log(update);
    if (update) {
        message = "Refresujte stranicu";
        document.getElementById("descriptionnn").innerHTML = message;
        document.getElementById("prosloo").classList.add("active");
        document.getElementById("dismiss-popup-btnn").addEventListener("click", function() {
          document.getElementsByClassName("popup")[2].classList.remove("active");
        });
      } else {
        document.getElementById("descriptionn").innerHTML = message;
        document.getElementById("nijeProsloo").classList.add("active");
        console.log(document.getElementsByClassName("popup"));
        document.getElementById("dismiss-popup-btnnn").addEventListener("click", function() {
            document.getElementsByClassName("popup")[3].classList.remove("active");
        });
      }
      
});


table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("delete-btn-destination")) {
      var row = target.parentNode.parentNode;
      console.log(row);
  
      document.getElementById("areYouSuree").classList.add("active");

      document.getElementById("dismiss-popup-btna").addEventListener("click", function() {
        document.getElementsByClassName("popup")[4].classList.remove("active");
      });
  
      document.getElementById("ok-popup-btna").addEventListener("click", function() {
        document.getElementsByClassName("popup")[4].classList.remove("active");
        console.log(document.getElementsByClassName("popup"));

        var httpRequest = new XMLHttpRequest();
        console.log(destinations);
        for(var id in destinations) {
          console.log(id);
            for(var ids in destinations[id]){
                if (destinations[id][ids]['naziv'] === row.children[0].textContent) {
                    console.log(id);
                    httpRequest.onreadystatechange = function() {
                      if (this.readyState == 4) {
                        if (this.status == 200) {
                          // Obrada uspešnog brisanja korisnika
                          console.log(document.getElementsByClassName("popup"));
                          document.getElementById("obrisanO").classList.add("active");
                          document.getElementById("dismiss-popup-btN").addEventListener("click", function() {
                            document.getElementsByClassName("popup")[5].classList.remove("active");
                          });
                          row.parentNode.removeChild(row);
                        } else {
                          window.location.href = "greska.html";
                        }
                      }
                    };
          
                    httpRequest.open('DELETE', firebaseUrl + '/destinacije/' + id + '.json');
                    httpRequest.send();
                  }
            }
        }
      });
    }
  });
  
