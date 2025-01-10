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

function display(meals, showAll) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; 

    meals.forEach((meal) => {
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("innerdivstyle");

        mealDiv.innerHTML = `
            <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
            <p><strong>Meal Name:</strong> ${meal.strMeal}</p>
            <p><strong>Meal Title:</strong> ${meal.strCategory}</p>
            <img style="width:400px; height:400px" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
            <p><a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch Recipe</a></p>
        `;

        displayArea.appendChild(mealDiv);
    });

   
    if (allMeals.length > 5 && !showAll) {
        document.getElementById("showAllButton").style.display = "block";
    } else {
        document.getElementById("showAllButton").style.display = "none";
    }
}

function showall() {
 
    display(allMeals, true);

    document.getElementById("showAllButton").style.display = "none";

    document.getElementById("searchmeal").value = "";
}