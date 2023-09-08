document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#searchBar");
  const button = document.querySelector("#addRandomUsers");

  form.addEventListener("submit", (e) => searchHandler(e));
  button.addEventListener("click", (e) => addRandomUsersHandler(e));
});

const userActionsDiv = document.getElementById("userActions");
let lastActionIsAddingRandomUsers = false;

function searchHandler(event) {
  event.preventDefault();

  const searchName = document.getElementById("searchName").value;
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
          const resultItem = document.createElement("div");
          resultItem.textContent = `${i + 1}. ${result.fullName}`;
          userActionsDiv.appendChild(resultItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      userActionsDiv.textContent = "An error occurred during the search.";
    });
}

function addRandomUsersHandler(event) {
  event.preventDefault();

  fetch("/api/postRandomProfiles")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");

      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        userActionsDiv.textContent = "No results found.";

      } else {
        if (!lastActionIsAddingRandomUsers) userActionsDiv.textContent = "";
        
        lastActionIsAddingRandomUsers = true;

        data.forEach(result => {
          const resultItem = document.createElement("div");

          let count = userActionsDiv.children.length + 1
          let fullName = `${result.name.first} ${result.name.last}`
          let picture = result?.picture?.thumbnail || "";

          resultItem.textContent = `${count}. ${fullName}`;

          let div = `<div>${count}. <img src="${picture}" alt="${fullName}"> ${fullName}</div>`

          userActionsDiv.innerHTML += div;
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      userActionsDiv.textContent = "An error occurred during the search.";
    });
}
