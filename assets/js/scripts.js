//for the menu icon//
$(document).ready(function () {
  $("#icon").click(function () {
    $("ul").toggleClass("show");
  });
});
//for modal
var searchbtn = document.querySelector("#search-btn");
var enterbtn = document.querySelector("enterbtn");

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
    data: { grant_type: "client_credentials", client_id: "6RXo2SqyWk7nP56KetTQFH6quBE36vEp00h4vZRBtcAWdC5gBP", client_secret: "b4Q9HAO2bVTwBs1k87rnFNZzVx14OULGO47xwDkA" }
  })
    .done(function (msg) {
      console.log(msg)
       localStorage.setItem("token", JSON.stringify(msg))
     
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
                      <button  onclick=save_data()><i data-id="${animalsArray[index].id}" class="fas fa-heart"></i></button>
                      </div>
                      `;
      }
    });
  });
}
function save_data(){
  var newFavorite = $(event.target).attr("data-id")
  console.log(newFavorite)
  // this needs to grab data-id value from line 47 animalsArray[index].id
  var saveAnimal = JSON.parse(window.localStorage.getItem("animalArray")) || []
  saveAnimal.push(newFavorite)
  console.log(saveAnimal)
  window.localStorage.setItem("animalArray", JSON.stringify(saveAnimal))
}