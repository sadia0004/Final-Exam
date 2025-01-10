function connect() {
    const searchTerm = document.getElementById("searchmeal").value.trim();
    if (!searchTerm) return;

    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; 

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                allMeals = data.meals; 
                display(allMeals.slice(0, 5), false); 
                document.getElementById("showAllButton").style.display = allMeals.length > 5 ? "block" : "none";
                document.getElementById("searchmeal").value = "";
            } else {
                displayArea.innerHTML = "<p>No meals found.</p>";
                document.getElementById("showAllButton").style.display = "none";
            }
        });
}


