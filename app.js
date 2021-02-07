document.getElementById("search-btn").addEventListener("click", function () {
    displayWarning("");
    document.getElementById("meal-details").style.display = 'none';

    const searchMeal = document.getElementById("search-meal").value;
    const mealName = searchMeal.trim();

    if (mealName === "") {
        displayWarning("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    displayWarning(`No meal found. Please try again.`)
                }else{
                    displayMeal(data.meals);
                }
            })
    }
    // clear search box
    document.getElementById("search-meal").value = "";
});

// Search area.
document.getElementById("search-meal").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("search-btn").click();
});

function displayWarning(warning) {
    document.getElementById("warning-text").innerText = warning;
}


function displayMeal(meals) {
    // clear older search
    document.getElementById("meal-list").innerHTML = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
        <div onclick="mealDetails(${meal.idMeal})">
            <img class="meal-image" src="${meal.strMealThumb}">
            <h3 class='meal-title'> ${meal.strMeal}</h3>
        </div>
        `;
        document.getElementById("meal-list").appendChild(mealDiv);
    });
}

//single meal detail
function mealDetails(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetail(data.meals[0]);
        })
};

function displayMealDetail(meal) {
    document.getElementById("single-meal").innerHTML = `
    <div class="container">   
        <div>
            <img class="meal-details-image" src=${meal.strMealThumb}>
            <h2 class="meal-details-title">${meal.strMeal}</h2>
        </div>
        <div>
            <h5>Ingredients</h5>
            <ul id="ingredient-list"></ul>
        </div>
    <div>
    `;

    for (let i = 1; i <= 10; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }
        const li = document.createElement("li");
        li.innerHTML = `
        <li>${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }

    document.getElementById("meal-details").style.display = "block";
}