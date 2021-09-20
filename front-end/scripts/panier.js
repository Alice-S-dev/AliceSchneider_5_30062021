//Récupération du contenu du localStorage
contenuStorage = JSON.parse(localStorage.getItem("produits"));

//Récupération des éléments HTML
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

// Initialisation d'un tableau pour y mettre tous les prix produits du panier
let prixTableau = []; 

console.log(contenuStorage);

// **********  GESTION DU PANIER SELON LE REMPLISSAGE DU LS  **********
if (contenuStorage === null) { //Si le localStorage est vide...
	//...on masque les éléments de total panier et la section formulaire 
	blocTotal.style.display = "none";
	sectionForm.style.display = "none";
} else { //Sinon (si le LS est rempli)...
	//...on masque l'information "panier vide" et le bouton renvoyant aux produits,
	infoPanierVide.style.display = "none";
	btnProduits.style.display = "none";

	// pour chaque produit du LS... 
	for(let produit in contenuStorage) {
	//for(let produit = 0; produit < contenuStorage.length; produit++){	
		affichPanier(produit); // ...on lance la fonction pour afficher le produit dans le panier
		modifQte(produit);
		// Pour calculer le prix total du panier ...
		let prixProduits = contenuStorage[produit].totalProduit; //...on récupère le prix total de chaque produit
		prixTableau.push(prixProduits); //on envoie ces prix dans prixTableau
		

		//***************BAC A SABLE ***************





		//************** FIN BAC A SABLE ******************
	}
 
	calculPanier();	// Fonction qui calcule le prix total du panier
	supprProduit(); // Fonction qui supprime un article du panier au clic sur un bouton
	videPanier(); // Fonction qui vide le panier au clic sur un bouton
}

// **********  AFFICHAGE DES PRODUITS DANS LE PANIER ********** 
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
						<div class="qte-plus-moins">
							<button class="qte-moins btn-sm">-</button>
							<input type="text" name="qte-produit" id="qte-produit" class="qte-produit text-center" value="${contenuStorage[produit].quantite}" min="1" max="20">
							<button class="qte-plus btn-sm " >+</button>
						</div>	
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



// **********  CALCUL DU PRIX TOTAL D'UN PRODUIT  **********
function calculPanier() { 
	//on utilise la méthode reduce(), qui va accumuler les différentes valeurs pour n'en faire plus qu'une
	//ici on veut additionner toutes les valeurs qui sont dans notre prixTableau
	let reducteur = (accumulateur, valeur) => accumulateur + valeur; 
	let resultat = (prixTableau.reduce(reducteur, 0)); // On ajoute une valeur initiale de 0 pour eviter l'erreur si le tableau est vide
	totalPrixPanier.innerHTML = resultat + "€"; //on affiche le résultat dans notre élément de total
}

// **********  SUPPRESSION COMPLETE D'UN PRODUIT ********** 
function supprProduit() {
	let btnSupprProduit = document.querySelectorAll(".suppr-produit"); // On récupère tous les boutons suppr présents sur la page
	// S'il y a un seul article dans le panier
	if (contenuStorage.length === 1) { 
		for(let bouton = 0; bouton < btnSupprProduit.length; bouton++){//pour chaque bouton de notre tableau
			//on écoute l'évenement du clic sur le bouton de suppression d'un produit
			btnSupprProduit[bouton].addEventListener("click", (event) => { 
				event.preventDefault(); //pour éviter le rechargement de la page par défaut au clic sur le bouton
				localStorage.clear(); //on vide le LS
				// On notifie l'utilisateur de la suppression produit, et on recharge la page 
				alert("Ce produit a bien été supprimé du panier");
				location.reload();
			});
		}	
	// Sinon (s'il y a plus d'un article dans le panier)
	} else { 
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
}	

// **********  MODIFIER LA QUANTITE D'UN ARTICLE AVEC + et -  ********** 
function modifQte(produit) {
	let divQtePlusMoins = document.querySelectorAll('.qte-plus-moins');
	for(let div = 0; div < divQtePlusMoins.length; div++){
		//console.log(div);
		let inputQte = divQtePlusMoins[div].querySelector(".qte-produit");
		//console.log(inputQte);
// TROUVER COMMENT ENVOYER LA NOUVELLE VALEUR DANS LE LS
		let btnPlus = divQtePlusMoins[div].querySelector(".qte-plus");
		//console.log(btnPlus);
		btnPlus.addEventListener("click", (event) => {
			event.preventDefault();
			inputQte.value.innerHTML = inputQte.value++;
			//let idProduit = contenuStorage[div].id; 
			console.log(idProduit);
			//localStorage.setItem("produits", JSON.stringify(contenuStorage));
			//location.reload();
		});
		let btnMoins = divQtePlusMoins[div].querySelector(".qte-moins");
		//console.log(btnMoins);
		btnMoins.addEventListener("click", (event) => {
			event.preventDefault();
			inputQte.value--;
			//localStorage.setItem("produits", JSON.stringify(contenuStorage));
			//location.reload();
		});	
	}
}


// **********  VIDER LE PANIER ********** 
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








// **********  GESTION DU FORMULAIRE **********  

// On récupère les éléments de formulaire
let inputNom = document.getElementById("lastName");
let inputPrenom = document.getElementById("firstName");
let inputAdresse = document.getElementById("address");
let inputCp = document.getElementById("cp");
let inputVille = document.getElementById("city");
let inputTel = document.getElementById("tel");
let inputEmail = document.getElementById("email");

let checkbox = document.getElementById("checkbox");
let btnEnvoiForm = document.getElementById("validation");










