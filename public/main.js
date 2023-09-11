document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#searchBar");
  const button = document.querySelector("#addRandomUsers");

  form.addEventListener("submit", (e) => searchHandler(e));
  button.addEventListener("click", (e) => addRandomUsersHandler(e));
});

const userActionsDiv = document.getElementById("userActions");
let lastActionIsAddingRandomUsers = false;

let loaderTitle = document.querySelector(".loader_title");

async function searchHandler(event) {
  event.preventDefault();

  const searchName = document.getElementById("searchName").value;

  if (searchName === "") {
    userActionsDiv.textContent = "Search input is empty, return";
    return;
  }

  if (lastActionIsAddingRandomUsers) userActionsDiv.textContent = "";

  loaderTitle.innerHTML = "Searching...";

  toggleLoader();

  // await delay(30000);
  console.log("fetching...");

  if (!searchName) return;
  fetch(`/api/search?fullName=${searchName}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");

      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        userActionsDiv.textContent = "No results found.";
      } else {
        userActionsDiv.textContent = "";
        lastActionIsAddingRandomUsers = false;
        data.forEach((result, i) => {
          let div = `
            <div class="profile_bar flex items-center h-50 w-full font-mono text-xl p-2">
              ${i + 1}. ${result.fullName}<span class="text-gray-400 ml-1">[${result.phone}]<span>
            </div>`;
          userActionsDiv.innerHTML += div;
          console.log(result);
        });
      }

      toggleLoader();
    })
    .catch((error) => {
      console.error("Error:", error);
      userActionsDiv.textContent = "An error occurred during the search.";
    });
}

function addRandomUsersHandler(event) {
  event.preventDefault();

  if (!lastActionIsAddingRandomUsers) userActionsDiv.textContent = "";

  lastActionIsAddingRandomUsers = true;

  loaderTitle.innerHTML = "Generating new profiles and loading to DB...";

  toggleLoader();

  fetch("/api/postRandomProfiles")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");

      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        userActionsDiv.textContent = "No results found.";
      } else {
        data.forEach((result) => {
          const resultItem = document.createElement("div");

          let count = userActionsDiv.children.length + 1;
          let fullName = `${result.name.first} ${result.name.last}`;
          let picture = result?.picture?.thumbnail || "";

          console.log(result);

          resultItem.textContent = `${count}. ${fullName}`;

          let div = `
            <div class="profile_bar flex items-center h-50 w-full font-mono text-xl">
              ${count}. <img class="m-2" src="${picture}" alt="${fullName}"> ${fullName}
            </div>`;

          userActionsDiv.innerHTML += div;
        });
      }

      toggleLoader();
    })
    .catch((error) => {
      console.error("Error:", error);
      userActionsDiv.textContent = "An error occurred during the search.";
    });
}

function toggleLoader() {
  const profilesLoader = document.querySelector("#profilesLoader");

  let isHidden = profilesLoader.classList.contains("hidden");

  isHidden
    ? profilesLoader.classList.remove("hidden")
    : profilesLoader.classList.add("hidden");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
