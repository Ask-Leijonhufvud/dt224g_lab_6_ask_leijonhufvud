"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Ask Leijonhufvud
 */

// hämta formulär
const form = document.getElementById("searchform");
// hämta sökinput
const searchInput = document.getElementById("search");

// funktion: sök
function search() {
    console.log(searchInput.value);
}

// eventListener: sökning
form.addEventListener("submit", event => {
    event.preventDefault();
    search();
});