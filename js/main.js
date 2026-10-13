"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Ask Leijonhufvud
 */

// hämta formulär
const form = document.getElementById("searchform");

// funktion: sök
function search() {
    console.log("Form submitted")
}

// eventListener: sökning
form.addEventListener("submit", event => {
    event.preventDefault();
    search();
});