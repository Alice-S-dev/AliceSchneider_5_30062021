contenuStorage = JSON.parse(localStorage.getItem("produits"));

//récupération des éléments HTML
let infoPanierVide = document.querySelector(".info-panier-vide"); //
let btnProduits = document.querySelector(".btn-produits");
let panier = document.querySelector(".panier"); //
//let panierItem = document.querySelector(".panier-item");
//let imgProduit = document.querySelector("#img-produit");
//let nomProduit = document.querySelector("#nom-produit");
//let prixProduit = document.querySelector("#prix-produit");
//let qteProduit = document.querySelector("#qte-produit");
//let totalPrixProduit = document.querySelector("#total-produit");
let blocTotal = document.querySelector(".total"); //
let totalPrixPanier = document.querySelector(".total-panier__prix");//
let sectionForm = document.querySelector("#formulaire"); //

let prixTableau = []; // Initialisation d'un tableau pour y mettre tous les prix produits du panier


if (contenuStorage === null || contenuStorage.length === 0) { //Si le localStorage est vide, ou si son contenu = 0...
	//...on masque les éléments de contenu du panier, les éléments de total panier et la section formulaire 
	panier.style.display = "none";
	blocTotal.style.display = "none";
	sectionForm.style.display = "none";
} else { //Sinon (si le LS est rempli)...
	//...on masque l'information "panier vide" et le bouton menant aux produits,
	infoPanierVide.style.display = "none";
	btnProduits.style.display = "none";
	// pour chaque produit du LS... 
	for(let produit in contenuStorage) {
		affichPanier(produit); // ...on lance la fonction pour afficher le produit dans le panier
		// Pour calcul du prix total du panier
		let prixProduits = contenuStorage[produit].totalProduit; //on récupère le prix total de chaque produit
		prixTableau.push(prixProduits);
	}
 
	calculPanier();	// Fonction qui calcule le prix total du panier
	supprProduit(); // Fonction qui supprime un article du panier au clic sur un bouton
	videPanier(); // Fonction qui vide le panier au clic sur un bouton
}


// Gestion de l'affichage de chaque produit dans le panier
function affichPanier(produit) {
	panier.innerHTML += `
			<li class="panier-item mb-4">
				<div class="panier-item__img">
					<a href="produit.html?id=${contenuStorage[produit].id}">
						<img id="img-produit" src="${contenuStorage[produit].image}" alt="Image du produit - Orinoco">
					</a>
				</div>

				<div class="ligne"></div>

				<div class="panier-item__nom">
					<h2 id="nom-produit" class="m-0">${contenuStorage[produit].nom}</h2>
				</div>

				<div class="ligne"></div>
				
				<div class="panier-item__prix-unit">
					<p id="prix-produit" class="m-0">${contenuStorage[produit].prix}€</p>
				</div>

				<div class="ligne"></div>

				<div class="panier-item__qte">
					<div class="panier-item__qte__input">
						<label for="qte-produit">Quantité: </label>
						<input type="number" name="qte-produit" id="qte-produit" value="${contenuStorage[produit].quantite}" min="1" max="20">
					</div>
					<div class="panier-item__qte__suppr">
						<button class="suppr-produit btn-sm">Supprimer</button>
					</div>
				</div>

				<div class="ligne"></div>

				<div class="panier-item__prix-total text-bold">
					<p id="total-produit" class="m-0">${contenuStorage[produit].totalProduit}€</p>
				</div>		
			</li>`
}

// Calcul du prix total du panier
function calculPanier() { 
	//on utilise la méthode reduce(), qui va accumuler les différentes valeurs pour n'en faire plus qu'une
	//ici on veut additionner toutes les valeurs qui sont dans notre prixTableau
	let reducteur = (accumulateur, valeur) => accumulateur + valeur; 
	let resultat = (prixTableau.reduce(reducteur, 0)); // On ajoute une valeur initiale de 0 pour eviter l'erreur si le tableau est vide
	totalPrixPanier.innerHTML = resultat + "€"; //on affiche le résultat dans notre élément de total
}

// Gestion de la suppression d'un produit
function supprProduit() {
	let btnSupprProduit = document.querySelectorAll(".suppr-produit"); // On récupère tous les boutons suppr présents sur la page

	for(let bouton = 0; bouton < btnSupprProduit.length; bouton++){ //pour chaque bouton de notre tableau
	//on écoute l'évenement du clic sur le bouton de suppression d'un produit
		btnSupprProduit[bouton].addEventListener("click", (event) => { 
		event.preventDefault(); //pour éviter le rechargement de la page par défaut au clic sur le bouton
		// On récupère l'id du produit correspondant au bouton cliqué
		let suppressionId = contenuStorage[bouton].id; 
			// On filtre pour ne garder que les produits ne correspondant pas à l'id produit
		contenuStorage = contenuStorage.filter(item => item.id !== suppressionId);
		// On remet à jour le LS
		localStorage.setItem("produits", JSON.stringify(contenuStorage));
		// On notifie l'utilisateur de la suppression produit, et on recharge la page 
		alert("Ce produit a bien été supprimé du panier");
		location.reload();
		});
	};	
}	

// Gestion du vidage du panier
function videPanier() {
	let btnSupprPanier = document.querySelector("#btn-suppr-panier");
	btnSupprPanier.addEventListener("click", (event) => { // on écoute l'évenement du clic sur le bouton de suppression panier
		event.preventDefault();
		localStorage.clear(); // on vide le LS
		//On notifie l'utilisateur que le panier a été vidé et on recharge la page
		alert("Votre panier a bien été vidé");
		location.reload(); 
	});	
}







	






	




