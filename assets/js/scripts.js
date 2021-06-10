//for the menu icon//
$(document).ready(function () {
  $("#icon").click(function () {
    $("ul").toggleClass("show");
  });
});

//for modal

var searchbtn = document.querySelector("#search-btn");

var enterbtn = document.querySelector("enterbtn");
// var modalBg = document.querySelector(".modal-bg");

// var modalClose = document.querySelector(".modal-close");

// searchbtn.addEventListener("click", function () {
//   modalBg.classList.add("bg-active");
// });

// modalClose.addEventListener("click", function () {
//   modalBg.classList.remove("big-active");
// });

searchbtn.addEventListener("click", function (event) {
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
      displayResults.innerHTML = "";
      var animalsArray = data.animals;
      for (let index = 0; index < animalsArray.length; index++) {
        var image = "";
        if (animalsArray[index].photos[0]) {
          image = animalsArray[index].photos[0].medium;
        } else {
          image =
            "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg";
        }
        console.log(animalsArray[index].id);
        displayResults.innerHTML += `
          <div  class= "col s6">
                    <img src="${image}">
                      <h2>Name: ${animalsArray[index].name} </h2>
                      <h4>Gender: ${animalsArray[index].gender} </h4>
                      <h4>Contact: ${animalsArray[index].contact.email}</h4>  
                      <h4>Address: ${animalsArray[index].contact.address.address1}</h4>
                      <h4>City: ${animalsArray[index].contact.address.city}</h4>
                      <h4>Country: ${animalsArray[index].contact.address.country}</h4>
                      <h4>Zip Code: ${animalsArray[index].contact.address.postcode}</h4>

                      <a href= "./location.html?address=${animalsArray[index].contact.address.address1}&city=${animalsArray[index].contact.address.city}&zipcode=${animalsArray[index].contact.address.postcode}" >Get Directions</a>
                      <button data-id="${animalsArray[index].id}"><i onclick='save_data()' id="heart" class="fas fa-heart"></i></button>
                      </div>
                      `;
      }
    });
  });
}
