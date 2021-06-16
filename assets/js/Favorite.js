var msg = JSON.parse(localStorage.getItem("token"))
console.log(msg)


function displayFavorite() {
    console.log("call")
    // either get scores from localstorage or set to empty array
    var savedAnimal = JSON.parse(window.localStorage.getItem("animalArray")) || [];
    // savedAnimal.forEach(function() {
        for ( let i = 0; i < savedAnimal.length; i ++){

      var id = savedAnimal[i]

    //   call API again here 
  console.log(id)
      $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals?id=" + id , 
        dataType: "json",
        headers: { Authorization: "Bearer" + msg.access_token},
      }).done(function (data)  {
        console.log(data);
        var displayFavorite = document.querySelector("#displayFavorite");
        displayFavorite.innerHTML = "";
        var animalsArray = data.animals;
        for (let index = 0; index < animalsArray.length; index++){
          var image = "";
          if (animalsArray[index].photo[0]) {
            image = animalsArray[index].photo[0].medium;
          } else {
            image = "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg";
          }
          displayFavorite.innerHTML += `
          <div class = "col s6">
                    <img src="${image}">
                      <h2>Name: ${animalsArray[index].name} </h2>
                      <h4>Gender: ${animalsArray[index].gender} </h4>
                      <h4>Contact: ${animalsArray[index].contact.email} </h4>
                      <h4>Address: ${animalsArray[index].contact.address.address1} </h4>
                      <h4>City: ${animalsArray[index].contact.address.city} </h4>
                      <h4>Country: ${animalsArray[index].contact.address.country} </h4>
                      <h4>Zip Code: ${animalsArray[index].contact.address.postcode} </h4>
  
                      <a href= "./location.html?address=${animalsArray[index].contact.address.address1}&city=${animalsArray[index].contact.address.city}&zipcode=${animalsArray[index].contact.address.postcode}" >Get Directions</a>
                    </div>
                    `;
        }
      })
  
  }
}
  displayFavorite()