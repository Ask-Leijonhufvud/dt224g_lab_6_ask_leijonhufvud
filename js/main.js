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
        console.log(searchValue);
    }
}

// eventListener: sökning
form.addEventListener("submit", event => {
    event.preventDefault();
    search();
});