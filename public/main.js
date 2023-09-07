document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#searchBar");
  const searchResultsDiv = document.getElementById("searchResults");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchName = document.getElementById("searchName").value;
    if (!searchName) return;

    fetch(`/api/search?pilotName=${searchName}`)
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
          data.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.textContent = result.pilotName;
            searchResultsDiv.appendChild(resultItem);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        searchResultsDiv.textContent = "An error occurred during the search.";
      });
  });
});
