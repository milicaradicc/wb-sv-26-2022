var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";
var agenciesID = [];
var agencies = {};

searchAgency();
fetchAgencies();

function fetchAgencies() {
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        agencies = JSON.parse(httpRequest.responseText);
        console.log(agencies);
        createAgencyCards();
      } else {
        alert("agencije se ne mogu ucitati");
      }
    }
  };

  httpRequest.open("GET", firebaseUrl + "/agencije.json");
  httpRequest.send();
}

function createAgencyCards() {
  for (var id in agencies) {
    var agency = agencies[id];

    var original = document.getElementById("cards");
    var clone = original.cloneNode(true);
    clone.id = "";
    original.parentNode.appendChild(clone);

    var card = clone.querySelector(".card");
    card.addEventListener("click", handleCardClick.bind(null, id));

    clone.setAttribute("id",id);
    clone.setAttribute("dest",agency["destinacije"]);

    var data = clone.children[0].children;
    var icon = data[0];
    var cardContent = data[1];
    var title = cardContent.children[0];
    var list = cardContent.children[1];
    var adress = list.children[0];
    var year = list.children[1];
    var phone = list.children[2];
    var email = list.children[3];
    var button = cardContent.querySelector(".ctn");
    
    icon.src = agency["logo"];
    icon.alt = agency["naziv"];
    title.innerHTML = agency["naziv"];
    email.innerHTML = agency["email"];
    phone.innerHTML = agency["brojTelefona"];
    adress.innerHTML = agency["adresa"];
    year.innerHTML = agency["godina"];
    button.href = "agency_page.html?id=" + id;

    agenciesID.push(id);
  }

  document.getElementById("cards").style = "display:none";
}

function handleCardClick(id) {
  window.location.href = "agency_page.html?id=" + id;
}

function searchAgency() {
  var search = document.getElementById("search-form");

  search.addEventListener('submit', (e) => {
    e.preventDefault();
    // uzimam podatke iz forme
    var name = document.getElementById("agency-search");
    var destination = document.getElementById("destination-search");
    var agencije = document.getElementById("cards").parentNode;
    // remove proverava da li je trenutna kartica prva kartica
    // ako da display je none
    var remove = 0;
    // show - kako se ne bi prikazale agencije kojima odgovaa uneta destinacija
    // ali ne i naziv
    var show = true;
    Array.from(agencije.children).forEach((agency) => {
      agency.style="display:static";
      if(name.value!='' && name.value!=null){
          var title=agency.children[0].children[1].children[0].innerHTML;
          title = title.replaceAll('<mark>','');
          title = title.replaceAll('</mark>','');
          if(title.toLowerCase().includes(name.value.toLowerCase()))
          {
              var regEx=new RegExp(name.value,"ig");
              let change = title.replaceAll(regEx, `<mark>${name.value}</mark>`);
              agency.children[0].children[1].children[0].innerHTML=change;
              agency.style="display:static";
              show = true;
          }
          else
          {
            agency.style="display:none";
            show = false
          }
      }
      // u slucaju kada se klikne pretraga sa prazim podacima treba se resiti kartice
      // u koju se nista ne ucitava
      else{
        if(remove == 0){
          agency.style="display:none";
          show = false
          remove++;
        }else{
            agency.children[0].children[1].children[0].innerHTML=agency.children[0].children[1].children[0].innerHTML.replace(/<\/?mark>/g, "");
            agency.style="display:static";
            show = true;
          }
      }
      if(show){
        searchDestination(destination,agency);
      }
    });
  });
}
function searchDestination(destination,agency){
  
  if (destination.value != "" && destination.value != null) {
    var request=new XMLHttpRequest();
    var pass = false;
    request.onreadystatechange=function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinations = JSON.parse(request.responseText);
                console.log(destinations)
                for(id in destinations)
                {
                  console.log(destinations[id]["naziv"].toLowerCase())
                  console.log(destination.value.toLowerCase())
                    if(destinations[id]["naziv"].toLowerCase().includes(destination.value.toLowerCase()))
                    {
                      console.log('proslo!!!!!!!!!!!!!!!!!!!')
                      pass = true;
                    }
                }
                if(pass){
                  agency.style="display:style";
                }else{
                  agency.style="display:none";
                }
            } else {
                window.location.href = "error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/destinacije/'+ agency.getAttribute("dest") +'.json');
    request.send();
  }
}