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

// funktion: hämta sökresultat, omvandla från JSON, skicka vidare; hantera ev. fel
async function getRecipe(search) {
    // försök hämta recept
    try {
        // hämta recept
        let response = await fetch(`https://dummyjson.com/recipes/search?q=${search}`);
        // omvandla från JSON
        let data = await response.json();
        // skicka vidare
        console.log(data); // placeholder
    } catch (error) {
        // hantera ev. fel
        console.log(`${error.name}: ${error.message}`);
    }
}

// funktion: visa första sökresultatet el. meddelande om att inget resultat gavs

// funktion: hämta och validera söksträng; visa felmeddelande eller skicka vidare
function search() {
    // ta bort eventuellt felmeddelande
    errorMessageP.textContent = "";

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