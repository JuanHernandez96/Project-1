const apiKey = "563492ad6f917000010000012a9aaacd7f044264a89c34f26c7ba7bc"
const next = document.querySelector(".next")
const input = document.querySelector(".input")
const searchbtn = document.querySelector(".searchButton")

let page = 1
let search = false
let query = ""

input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;
});

async function getphoto(page) {
    const data = await fetch("https://api.pexels.com/v1/curated?per_page=15&=${page}",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apiKey,
            }
        }
    );
    const result= await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p> 
        <a href=${photo.src.large}>Download</a>`;
   document.querySelector(".gallery").appendChild(pic);
    });
}

// async function searchPhotos(page) {
//     const data = await fetch("https://api.pexels.com/v1/search?query=${query}&per_page=1",
//         {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 Authorization: apiKey,
//             }
//         }
//     );
//     const result= await data.json();
//     result.photos.forEach((photo) => {
//         const pic = document.createElement("div");
//         pic.innerHTML = `<img src=${photo.src.large}>
//         <p>Photo : ${photo.photographer}</p> 
//         <a href=${photo.src.large}>Download</a>`;
//    document.querySelector(".gallery").appendChild(pic);
//     });
// }
// searchButton.addEventListener("click", () => {
//     if(input.value ==="")return;
//     search = true;
//     searchPhotos(query.page);
// })
next.addEventListener("click", () => {
    if (!search)
    {
    page++;
    getphoto(page);
    }
    else{
        if(query.value === "") return;
        page++;
        searchPhotos(query.page)
    }
})

getphoto(page)