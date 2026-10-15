"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Ask Leijonhufvud
 */

// hämta formulär
const form = document.getElementById("searchform");
// hämta sökinput
const searchInput = document.getElementById("search");
// hämta felmeddelandefält
const errorMessageP = document.getElementById("error");
// hämta meddelandefält
const messageSection = document.getElementById("message");
// hämta receptfält
const recipeSection = document.getElementById("recipe");

// funktion: hämta sökresultat, omvandla från JSON, skicka vidare; hantera ev. fel
async function getRecipe(search) {
  // försök hämta recept
  try {
    // hämta recept
    let response = await fetch(
      `https://dummyjson.com/recipes/search?q=${search}`,
    );
    // omvandla från JSON
    let data = await response.json();
    // skicka vidare
    printToDOM(data);
  } catch (error) {
    // hantera ev. fel
    console.error(error);
    messageSection.innerHTML = `<p>Fel vid hämtning av sökresultat: ${error.name}: ${error.message}</p>`;
  }
}

// funktion: visa första sökresultatet el. meddelande om att inget resultat gavs
function printToDOM(input) {
  // försök hantera sökresultat
  try {
    // kolla om något recept returnerades
    if (input.recipes.length == 0) {
      // om inga recept returnerades, skriv ut meddelande om att inget recept hittades
      messageSection.innerHTML =
        "<p><strong>Inget recept hittades, prova en ny sökfras.</strong></p>";
    } else {
      // om recept returnerades
      console.log(input.recipes[0]); // för att se datastruktur

      // skapa <article> för recept
      const recipe = document.createElement("article");

      // skapa och hantera <h3> för receptets namn
      const recipeName = document.createElement("h3");
      recipeName.textContent = input.recipes[0].name;
      recipe.appendChild(recipeName);

      // visa bild av maträtt
      const recipeImg = document.createElement("img");
      recipeImg.src = input.recipes[0].image;
      recipeImg.alt = `Bild av ${input.recipes[0].name}`;
      recipe.appendChild(recipeImg);

      // visa receptinfo
      const recipeInfo = document.createElement("div");
      recipeInfo.setAttribute("class", "recipe-info");
      recipeInfo.innerHTML =
        `<p><strong>Servings:</strong> ${input.recipes[0].servings}</p>` +
        `<p><strong>Prep time:</strong> ${input.recipes[0].prepTimeMinutes} minutes</p>` +
        `<p><strong>Cooking time:</strong> ${input.recipes[0].cookTimeMinutes} minutes</>` +
        `<p><strong>Difficulty:</strong> ${input.recipes[0].difficulty}</p>`; // fetstil visas ej för mig, osäker om varför
      recipe.appendChild(recipeInfo);

      // visa lista med ingredienser
      recipe.innerHTML += "<h4>Ingredients</h4>";
      const ingredientsList = document.createElement("ul");
      input.recipes[0].ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li>${ingredient}</li>`;
      });
      recipe.appendChild(ingredientsList);

      // visa instruktioner
      recipe.innerHTML += "<h4>Instructiones</h4>";
      const instructions = document.createElement("ol");
      input.recipes[0].instructions.forEach((instruction) => {
        instructions.innerHTML += `<li>${instruction}</li>`;
      });
      recipe.appendChild(instructions);

      // visa recept
      recipeSection.appendChild(recipe);
    }
  } catch (error) {
    // hantera ev. fel vid bearbetning av sökresultat
    console.error(error);
    messageSection.innerHTML = `<p>Fel vid bearbetning av sökresultat: ${error.name}: ${error.message}</p>`;
  }
}

// funktion: hämta och validera söksträng; visa felmeddelande eller skicka vidare
function search() {
  // ta bort eventuella felmeddelanden el. föregående sökresultat
  errorMessageP.textContent = "";
  recipeSection.innerHTML = "";
  messageSection.innerHTML = "";

  // sätt variabel för strängen i sökfältet
  let searchValue = searchInput.value;

  // validera söksträng
  // om söksträngen är tom
  if (searchValue.trim() === "") {
    // visa felmeddelande
    errorMessageP.textContent = "Du måste fylla i en sökfras!";
  } else {
    // om söksträngen EJ är tom
    // skicka vidare till funktion som hämtar data
    getRecipe(searchValue);
  }
}

// eventListener: sökning
form.addEventListener("submit", (event) => {
  event.preventDefault();
  search();
});
