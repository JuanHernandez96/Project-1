 let animals = {
    apikey = "9SyoHw6D",
resucePet: function () {
  fetch(
    "https://api.rescuegroups.org/http/v2.json"
    +this.apikey
  )
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
}
  }


petApiKey= "FBrjvWBdiNTgthvFmtSElrrE5KLkDN9um8KrVQKxKkDCIJJsjV"
petSecret = "I6rmtBHl0TCA9Mj4SAWKAXANtRUBfXNIcRFCGeJS"
petToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJGQnJqdldCZGlOVGd0aHZGbXRTRWxyckU1S0xrRE45dW04S3JWUUt4S2tEQ0lKSnNqViIsImp0aSI6IjNmMzcwNTliYWZlYjYwNmUzY2Y4NmM2NGU2Mzc3NTdmMGNjYTMzN2I3ZmMyNGQzMmZiNWE4YzNlNWRiZDNkYTczNDM1ZjQyYTJiNGQzNzhlIiwiaWF0IjoxNjIyOTMwNzY5LCJuYmYiOjE2MjI5MzA3NjksImV4cCI6MTYyMjkzNDM2OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.QrB4deaOXvBxjaJmaGHMWn0xy9T-bxOb4jim0PiXdZHjkgHMzJaq1DmetbCBdR_z5MSIkCu2vRObDxfXZoAuHuRDqkICPlpHRYXWKZ1vXlBbn7tgHDUyF0rWojF9NSsYYafsboisJhu3Qm0E2ASvJV2uCMqju4EOFLrvKSONFVYh0ef3PPWvehNGTzMX0igTO_end9o7V7F_c_HYCfrHnDmrdryg2PDMLpmPFyCsV60sqS4tQSPwIv2K5gaxfHFzOznQnKZvqtoNM8pBUX1iGittq3R8WDPXuKyXp0OFTlMtHU9yVjIYYgKwTxA7bzEKHiM9Pf7HrFlv-e63pKzbhw"
url =  "https://api.petfinder.com/v2"








//for the menu//
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});
