//for the menu icon//
$(document).ready(function () {
  $("#icon").click(function () {
    $("ul").toggleClass("show");
  });
});

//for search

var enterbtn = document.querySelector("#enterbtn");

enterbtn.addEventListener("click", function (event) {
  event.preventDefault();

  var zip = document.querySelector("#zipcode");
  var animalType = document.querySelector("#animalType");
  getAnimal(animalType.value, zip.value);
});

function getAnimal(animalType, location) {
  $.ajax({
    method: "POST",
    url: "https://api.petfinder.com/v2/oauth2/token",
    data: { grant_type: "client_credentials", client_id: "91r5U7c01YadVDHmYCPyaE8vMuFKg35qriDBIPa5s0NOFIxnaz", client_secret: "WbfUIeUyx15e8kSqqr74SUq6kDyayTFHtq3kBOgx" }
  })
    .done(function (msg) {
      console.log(msg)


      $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals?type=" + animalType   + "&location=" + location,
        headers: { Authorization: "Bearer " + msg.access_token }
      })

        .done(function (data) {
          console.log(data)
          var displayResults = document.querySelector(".displayResults")
          var animalsArray = data.animals
                for (let index = 0; index < animalsArray.length; index++) {
                     if(animalsArray[index].photos[0]){
                      displayResults.innerHTML+=`
                      <h2>${animalsArray[index].name} </h2>
                      <h4>${animalsArray[index].contact.email}</h4>
                      <img src="${ animalsArray[index].photos[0].medium}">             
                      <a><i onclick="save_data()" id="heart" class="fas fa-heart"></i></a>
                      
                      `
                     }
                    
                }
        });

    });
}

    $.ajax({
      method: "GET",
      url:
        "https://api.petfinder.com/v2/animals?type=" +
        animalType +
        "&location=" +
        location,
      headers: { Authorization: "Bearer " + msg.access_token },
    }).done(function (data) {
      console.log(data);
      var displayResults = document.querySelector("#displayResults");

      var animalsArray = data.animals;

      for (let index = 0; index < animalsArray.length; index++) {
        if (animalsArray[index].photos[0]) {
          displayResults.innerHTML += `
                       <h2>Name: ${animalsArray[index].name} </h2>
                       <h2>Gender: ${animalsArray[index].gender}</h2>
                       <h4>Contact: ${animalsArray[index].contact.email}</h4>
                      <img src="${animalsArray[index].photos[0].medium}"> 
                      <a href=${animalsArray[index].photos[0].medium}><i class="fas fa-heart"></i></a>         
                      `;
        }
      }
    });
  }):
}
// /*button for save fav*/
//
//   );
// });
var favButton = document.getElementById("favBtn");
var favoriteDataObj = {};
