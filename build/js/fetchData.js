"use strict";
const content = $('#app');
const jsonURL = "../assets/JSON/categorias.json";
// ----------------------------------------------------------------
// Leer JSON 
// La promesa devuelve la data o undefined
const loadItems = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log("fetch failed" + err);
    }
};
