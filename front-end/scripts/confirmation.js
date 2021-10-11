//Récupération du contenu du sessionStorage
const idCommandeStorage = JSON.parse(sessionStorage.getItem("idCommande"));
const infosCommandeStorage = JSON.parse(sessionStorage.getItem("commande"));
const prixCommandeStorage = JSON.parse(sessionStorage.getItem("prixCommande"));

//Récupération des éléments du DOM
const nomUtilisateur = document.querySelector(".nom-utilisateur");
const idCommande = document.querySelector(".id-commande");
const prixCommande = document.querySelector(".prix-commande");
const boutonAccueil = document.querySelector(".bouton-accueil");

//Organisation des données récupérées 
nomUtilisateur.innerHTML = `Merci ${infosCommandeStorage.contact.firstName},`;
prixCommande.innerHTML = `${prixCommandeStorage} €`;
idCommande.innerHTML = idCommandeStorage;

//Gestion du clic sur le bouton de retour
boutonAccueil.addEventListener("click", (event) => {
	event.preventDefault();
	window.location.href = "index.html"; //on retourne à la page d'accueil 	
});

