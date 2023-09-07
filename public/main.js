document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#searchBar");

  form.addEventListener("submit", (e) => searchHandler(e));
});

const searchResultsDiv = document.getElementById("searchResults");

function searchHandler(event) {
  event.preventDefault();

  const searchName = document.getElementById("searchName").value;
  if (!searchName) return;
  fetch(`/api/search?fullName=${searchName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        searchResultsDiv.textContent = "No results found.";
      } else {
        searchResultsDiv.textContent = "";
        data.forEach((result, i) => {
          const resultItem = document.createElement("div");
          resultItem.textContent = `${i + 1}. ${result.fullName}`;
          searchResultsDiv.appendChild(resultItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      searchResultsDiv.textContent = "An error occurred during the search.";
    });
}
