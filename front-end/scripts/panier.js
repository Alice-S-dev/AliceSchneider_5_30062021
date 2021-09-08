//On masque la section formulaire tant que la panier est vide
sectionForm = document.querySelector("#formulaire");
sectionForm.style.display = "none";
// Pour afficher à nouveau : sectionForm.style.display = "block";

//localStorage.clear();
let contenuStorage = localStorage.getItem("produits");

console.log(contenuStorage);



