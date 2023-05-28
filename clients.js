var firebaseUrl = "https://webprojekat-5430f-default-rtdb.europe-west1.firebasedatabase.app";

var usersID = [];
var users = {};

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        users = JSON.parse(httpRequest.responseText);
        console.log(users)
        for(var id in users){
            var user = users[id]
            console.log(id)

            var original = document.getElementById("row");

            var clone = original.cloneNode(true);
            clone.id = "";
            original.parentNode.appendChild(clone);

            var username = clone.children[0];
            var name = clone.children[1];
            var lastname = clone.children[2];
            var emaill = clone.children[3];
            var dateofbirth = clone.children[4];
            var phonenumber = clone.children[5];
            var adresa = clone.children[6];
            var deletebtn = clone.children[7];

            username.innerHTML=user["korisnickoIme"];
            name.innerHTML=user["ime"];
            lastname.innerHTML=user["prezime"];
            emaill.innerHTML=user["email"];
            dateofbirth.innerHTML=user["datumRodjenja"];
            adresa.innerHTML=user["adresa"];
            phonenumber.innerHTML=user["telefon"];

            deletebtn.addEventListener('click',(e)=>{
                var deletebtn = false;
                var httpRequest = new XMLHttpRequest();
                var id = deletebtn.getAttribute('user');
                document.getElementsByClassName("popup")[0].classList.add("active");
                document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
                  document.getElementsByClassName("popup")[0].classList.remove("active");})
                
                request.onreadystatechange=function(){
                  if (this.readyState == 4) {
                      if (this.status == 200) {
                        
                        document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
                          document.getElementsByClassName("popup")[0].classList.remove("active");})
                      } else {
                          window.location.href = "greska.html";
                      }
                  }
              }
            httpRequest.open('DELETE', firebaseUrl + '/korisnici/'+ id +'.json');
            httpRequest.send();

            })
        }
        document.getElementById("row").style="display:none";
    } else {
      alert("Error occurred. Agencies could not be loaded.");
    }
  }
};
httpRequest.open("GET", firebaseUrl + "/korisnici.json");
httpRequest.send();


