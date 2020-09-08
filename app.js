const auth = "563492ad6f91700001000001124a5b37885241a9938060965c02c810";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search_button");

const url = "https://api.pexels.com/v1/curated?per_page=15&page=1";
let searchValue;

/*
    -- Add eventListner 
*/

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchValue = e.target.value;
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
  searchPhoto(searchValue);
});

//func

/*
    --all Photos at The API
*/

async function curatedPhotos() {
  let data = await fetchData(url);
  displayData(data);
}

/*
    -- Search for a specific photo
*/

async function searchPhoto(query) {
  const searchUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  let dataFetch = await fetchData(searchUrl);
  displayData(dataFetch);
}

/*
    --Fetch Data From API
*/
async function fetchData(url) {
  let dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  console.log(data);
  return data;
}

/*
    --Display Data 
*/

function displayData(data) {
  data.photos.forEach((photo) => {
    const img = document.createElement("div");
    img.classList.add("p-4");
    img.classList.add("float-left");
    img.innerHTML = `<img src=${photo.src.large}></img> <p>${photo.photographer}</p>`;
    gallery.appendChild(img);
  });
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
