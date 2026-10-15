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
        let response = await fetch(`https://dummyjson.com/recipes/search?q=${search}`);
        // omvandla från JSON
        let data = await response.json();
        // skicka vidare
        printToDOM(data);
    } catch (error) {
        // hantera ev. fel
        console.log(`${error.name}: ${error.message}`);
    }
}

// funktion: visa första sökresultatet el. meddelande om att inget resultat gavs
function printToDOM(input) {
    // kolla om något recept returnerades
    if (input.recipes.length == 0) {
        // om inga recept returnerades, skriv ut meddelande om att inget recept hittades
        messageSection.innerHTML = "<p><strong>Inget recept hittades, prova en ny sökfras.</strong></p>"
    }
}

// funktion: hämta och validera söksträng; visa felmeddelande eller skicka vidare
function search() {
    // ta bort eventuella felmeddelanden el. föregående sökresultat
    errorMessageP.textContent = "";
    recipeSection.innerHTML = "";
    messageSection.innerHTML = "";

    // sätt variable för strängen i sökfältet
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
form.addEventListener("submit", event => {
    event.preventDefault();
    search();
});