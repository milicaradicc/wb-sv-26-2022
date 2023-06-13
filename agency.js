var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var queryParams = window.location.search;
var urlParams = new URLSearchParams(queryParams);
var id = urlParams.get("id");
console.log(id);
searchDestination();

var agencyRequest = new XMLHttpRequest();
agencyRequest.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      var agency = JSON.parse(agencyRequest.responseText);
      console.log(agency);
      var titlename = document.getElementById("titlename");
      titlename.innerHTML = agency["naziv"]

      var idForDestinations = agency['destinacije'];
      
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
            for (var id in destinations) {
              var destination = destinations[id];
              console.log(destination);
            
              var original = document.getElementById("cards1");
              var clone = original.cloneNode(true);
            
              clone.id = "";
              original.parentNode.appendChild(clone);
            
              clone.setAttribute("tip", destination['tip']);
              clone.setAttribute("prevoz", destination['prevoz']);
            
              var data = clone.children[0].children;
              console.log(data);
              var img = data[0];
              var cardContent = data[1];
              var title = cardContent.children[0];
              var info = cardContent.children[1];
              var button = cardContent.querySelector(".ctn");
            
              img.src = destination['slike'][0];
              img.alt = destination['naziv'];
              title.innerHTML = destination['naziv'];
              info.innerHTML = destination['opis'].substring(0, 250) + '...';
            
              clone.addEventListener("click", createDestinationClickHandler(id, agency));
            
              button.href += "?id=" + id + "&agencija=" + agency["naziv"] + "&agencijaId=" + urlParams.get('id');
            
              var found=false;
              var tip=document.getElementById("type-search");
              for(i in tip.options)
              {
                  if(tip.options[i].innerText==destination["tip"])
                  {
                     found=true; 
                  }
              }
              if(!found)
              {
                  tip.add(new Option(destination["tip"]));
              }
              found=false;
              var prevoz=document.getElementById("ride-search");
              for(i in prevoz.options)
              {
                  if(prevoz.options[i].innerText==destination["prevoz"])
                  {
                     found=true; 
                  }
              }
              if(!found)
              {
                  prevoz.add(new Option(destination["prevoz"]));
              }
            }
            
            original.parentNode.removeChild(original.parentNode.firstChild);
            document.getElementById("cards1").style = "display:none";
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

function createDestinationClickHandler(destinationId, agency) {
  return function() {
    window.location.href = "destination.html?id=" + destinationId + "&agencija=" + agency["naziv"] + "&agencijaId=" + urlParams.get('id');
  };
}

function searchDestination(){
    var search = document.getElementById("search-form2");
    search.addEventListener("submit",(e)=>{
      e.preventDefault();
      var name = document.getElementById("name-search");
      var type=document.getElementById("type-search").options[document.getElementById("type-search").selectedIndex].text;
      var transport=document.getElementById("ride-search").options[document.getElementById("ride-search").selectedIndex].text;
      var destinations = document.getElementById("cards1").parentNode;
      console.log(destinations);
      var remove = 0;
      console.log(type)

      Array.from(destinations.children).forEach((destination) => {
        destination.style="display:static";
        if(name.value!='' && name.value!=null){
          
            var naslov=destination.children[0].children[1].children[0].innerHTML;
            console.log(naslov)
            naslov=naslov.replaceAll('<mark>','');
            naslov=naslov.replaceAll('</mark>','');
            if(naslov.toUpperCase().includes(name.value.toUpperCase()))
            {
                var regEx=new RegExp(name.value,"ig");
                let title = naslov.replaceAll(regEx, `<mark>${name.value}</mark>`);
                destination.children[0].children[1].children[0].innerHTML=title;
                console.log(title)
                console.log('proslo')
              }
            else
            {
              destination.style="display:none";
            }
        }else{
          if(remove == 0){
            destination.style="display:none";
            remove++;
          }else{
          destination.children[0].children[1].children[0].innerHTML=destination.children[0].children[1].children[0].innerHTML.replace(/<\/?mark>/g, "");
          destination.style="display:static";
          }
        }




        if(type !="Tip putovanja"){
          console.log('usao u tip')
          if(type === destination.getAttribute('tip')){
            destination.style="display:static";
          }else{
            destination.style="display:none";
          }
        }
        if(transport != "Vrsta prevoza"){
          console.log('usao u prevoz')
          if(destination.getAttribute('prevoz' === transport)){
            destination.style="display:static";
          }else{
            destination.style="display:none";
          }
        }
      });

    })
}