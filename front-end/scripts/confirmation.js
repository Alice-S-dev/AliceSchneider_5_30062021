//Récupération du contenu du localStorage
let idCommandeStorage = JSON.parse(localStorage.getItem("idOrder"));
let infosCommandeStorage = JSON.parse(localStorage.getItem("order"));

//Récupération des éléments du DOM
let nomUtilisateur = document.querySelector(".nom-utilisateur");
let idCommande = document.querySelector(".id-commande");
let boutonAccueil = document.querySelector(".bouton-accueil");

//Organisation des données récupérées 
nomUtilisateur.innerHTML = `Merci ${infosCommandeStorage.contact.firstName},`;
idCommande.innerHTML = idCommandeStorage;

//Gestion du clic sur le bouton de retour
boutonAccueil.addEventListener("click", (event) => {
	event.preventDefault();
	localStorage.clear(); // on vide le LS
	window.location.href = "index.html"; //on retourne à la page d'accueil 	
});

