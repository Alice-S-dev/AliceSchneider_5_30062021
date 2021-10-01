//Récupération du contenu du localStorage
contenuStorage = JSON.parse(localStorage.getItem("produits"));
console.log(contenuStorage);
//Récupération des éléments HTML
const infoPanierVide = document.querySelector(".info-panier-vide"); 
const btnProduits = document.querySelector(".btn-produits");
const panier = document.querySelector(".panier"); 
const blocTotal = document.querySelector(".total"); 
const totalPrixPanier = document.querySelector(".total-panier__prix");
const sectionForm = document.querySelector("#formulaire"); 

// Initialisation d'un tableau pour y mettre tous les prix produits du panier
let prixTableau = [];

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
	contenuStorage.forEach((produit) => {
		affichPanier(produit); // ...on lance la fonction pour afficher le produit dans le panier
		// Pour calculer le prix total du panier ...
		let prixProduits = produit.totalProduit; //...on récupère le prix total de chaque produit
		prixTableau.push(prixProduits); //on envoie ces prix dans prixTableau
	});
	supprProduit(); // Fonction pour supprimer un article du panier 
	qtePlus(); // Fonction pour incrémenter la quantité d'un article du panier
	qteMoins(); // Fonction pour décrémenter la quantité d'un article du panier
	modifInput(); //Fonction pour modifier un input en entrée directe
	videPanier(); // Fonction pour vider le panier 
}

// **********  AFFICHAGE DES PRODUITS DANS LE PANIER ********** 
function affichPanier(produit) {
	panier.innerHTML += `
				<li class="panier-item mb-4">
					<div class="panier-item__img">
						<a href="produit.html?id=${produit.id}">
							<img id="img-produit" src="${produit.image}" alt="Image du produit - Orinoco">
						</a>
					</div>

					<div class="ligne"></div>

					<div class="panier-item__nom">
						<h2 id="nom-produit" class="m-0">${produit.nom}</h2>
					</div>

					<div class="ligne"></div>
					
					<div class="panier-item__prix-unit">
						<p id="prix-produit" class="m-0">${produit.prix}€</p>
					</div>

					<div class="ligne"></div>

					<div class="panier-item__qte">
						<div class="panier-item__qte__input">
							<label for="qte-produit">Quantité: </label>
							<div class="qte-plus-moins">
								<button class="qte-moins btn-sm">-</button>
								<input type="text" name="qte-produit" id="qte-produit" class="qte-produit text-center" value="${produit.quantite}" min="1" max="20">
								<button class="qte-plus btn-sm " >+</button>
							</div>	
						</div>
						<div class="panier-item__qte__suppr">
							<button class="suppr-produit btn-sm">Supprimer</button>
						</div>
					</div>

					<div class="ligne"></div>

					<div class="panier-item__prix-total text-bold">
						<p id="total-produit" class="m-0">${produit.totalProduit}€</p>
					</div>		
				</li>`		
}


// **********  CALCUL DU PRIX TOTAL D'UN PRODUIT  **********
	//on utilise la méthode reduce(), qui va accumuler les différentes valeurs pour n'en faire plus qu'une	
const reducteur = (accumulateur, valeur) => accumulateur + valeur; //ici on veut additionner toutes les valeurs qui sont dans notre prixTableau
const resultat = (prixTableau.reduce(reducteur, 0)); // On ajoute une valeur initiale de 0 pour eviter l'erreur si le tableau est vide
totalPrixPanier.innerHTML = resultat + "€";	//on affiche le résultat dans notre élément de total


// **********  SUPPRESSION COMPLETE D'UN PRODUIT ********** 
function supprProduit() {
	const btnSupprProduit = document.querySelectorAll(".suppr-produit"); // On récupère tous les boutons suppr présents sur la page
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
				const produitId = contenuStorage[bouton].id; 
					// On filtre pour ne garder que les produits ne correspondant pas à l'id produit
				contenuStorage = contenuStorage.filter(item => item.id !== produitId);
				// On remet à jour le LS
				localStorage.setItem("produits", JSON.stringify(contenuStorage));
				// On notifie l'utilisateur de la suppression produit, et on recharge la page 
				alert("Ce produit a bien été supprimé du panier");
				location.reload();
			});
		};	
	}
}	

// **********  INCREMENTER DE 1 UN PRODUIT  ********** 
function qtePlus() {
	const btnPlus =  document.querySelectorAll(".qte-plus"); // On récupère tous les boutons + présents sur la page
	for(let plus = 0; plus < btnPlus.length; plus++) { //pour chaque bouton + de notre tableau
		if (contenuStorage[plus].quantite < 20) {
			//on écoute l'évenement du clic sur le bouton + d'un produit
			btnPlus[plus].addEventListener("click", (event) => {
				event.preventDefault();
				// On récupère la quantité du produit correspondant au bouton cliqué et on ajoute 1 à la quantité
				contenuStorage[plus].quantite = parseInt(contenuStorage[plus].quantite) + 1;
				// On recalcule le prix total du produit
				contenuStorage[plus].totalProduit = parseInt(contenuStorage[plus].quantite) * parseInt(contenuStorage[plus].prix);
				//on remet à jour le LS
				localStorage.setItem("produits", JSON.stringify(contenuStorage));
				//on recharge la page
				location.reload();
			});
		} else if (contenuStorage[plus].quantite = 20){
			btnPlus[plus].addEventListener("click", (event) => {
				event.preventDefault();
				alert("Vous ne pouvez pas mettre cet article plus de 20 fois dans votre panier.");
			}); 
		}	
	}
}

// **********  DECREMENTER DE 1 UN PRODUIT  ********** 
function qteMoins() {
	const btnMoins =  document.querySelectorAll(".qte-moins"); // On récupère tous les boutons - présents sur la page
	for(let moins = 0; moins < btnMoins.length; moins++) { //pour chaque bouton - de notre tableau
		if (contenuStorage[moins].quantite > 1) {
		//on écoute l'évenement du clic sur le bouton - d'un produit
			btnMoins[moins].addEventListener("click", (event) => {
				event.preventDefault();
				// On récupère la quantité du produit correspondant au bouton cliqué et on soustrait 1 à la quantité
				contenuStorage[moins].quantite = parseInt(contenuStorage[moins].quantite) - 1;
				// On recalcule le prix total du produit
				contenuStorage[moins].totalProduit = parseInt(contenuStorage[moins].quantite) * parseInt(contenuStorage[moins].prix);
				//on remet à jour le LS
				localStorage.setItem("produits", JSON.stringify(contenuStorage));
				//on recharge la page
				location.reload();
			});
		} else if (contenuStorage[moins].quantite = 1){
			btnMoins[moins].addEventListener("click", (event) => {
				event.preventDefault();
				alert("Vous ne pouvez pas choisir une quantité inférieure à 1.");
			});
		}	
	}
}

// **********  MODIFIER LA QUANTITE VIA L'INPUT ********** 
function modifInput() {
	const qteInput = document.querySelectorAll(".qte-produit");
	for(let i = 0; i < qteInput.length; i++) { // pour chaque input de quantité
		//On écoute l'évenement blur (perte du focus) sur l'input quantité
		qteInput[i].addEventListener("blur", () => { 
			if(qteInput[i].value >=1 && qteInput[i].value <=20) {
				//On récupère la nouvelle valeur de l'input pour l'attriber au produit correspondant
				contenuStorage[i].quantite = parseInt(qteInput[i].value);
				// On recalcule le prix total du produit
				contenuStorage[i].totalProduit = parseInt(contenuStorage[i].quantite) * parseInt(contenuStorage[i].prix);
				//on remet à jour le LS
				localStorage.setItem("produits", JSON.stringify(contenuStorage));
				//on recharge la page
				location.reload();
			} else {
				alert("La quantité doit être comprise entre 1 et 20 produits.");
				//On assigne une quantité de 1 au produit
				contenuStorage[i].quantite = 1;
				// On recalcule le prix total du produit
				contenuStorage[i].totalProduit = parseInt(contenuStorage[i].prix);
				//on remet à jour le LS
				localStorage.setItem("produits", JSON.stringify(contenuStorage));
				//on recharge la page
				location.reload();
			}

		});
	}
} 

// **********  VIDER LE PANIER ********** 
function videPanier() {
	const btnSupprPanier = document.querySelector("#btn-suppr-panier");
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
const inputNom = document.getElementById("lastName");
const inputPrenom = document.getElementById("firstName");
const inputAdresse = document.getElementById("address");
const inputCp = document.getElementById("cp");
const inputVille = document.getElementById("city");
const inputTel = document.getElementById("tel");
const inputEmail = document.getElementById("email");

const checkbox = document.getElementById("checkbox");
const btnValidation = document.getElementById("validation");

// On écoute l'évènement du clic sur le bouton de validation formulaire
btnValidation.addEventListener("click", (event) => {
	event.preventDefault();
	//Si l'un des champs de formulaire n'est pas valide...
	if (inputNom.validity.patternMismatch || inputPrenom.validity.patternMismatch || inputAdresse.validity.patternMismatch || inputCp.validity.patternMismatch || inputVille.validity.patternMismatch || inputTel.validity.patternMismatch || inputEmail.validity.typeMismatch || !checkbox.checked) {	
		//On affiche un message à l'utilisateur
		alert("Merci de renseigner correctement tous les champs pour valider le formulaire.");
	} else { // (si le formulaire est valide)
		// On récupère les ID des articles du panier
		let articlesId = [];
		contenuStorage.forEach(item =>
			articlesId.push(item.id)
		)
		// On crée l'objet à envoyer (contact + products)
		const commandeUtilisateur = {
			contact: {
				firstName: inputPrenom.value,
				lastName: inputNom.value,
				address: inputAdresse.value,
				city: inputVille.value,
				email: inputEmail.value
			},
			products: articlesId
		};
		//On prépare les options d'envoi au back-end 
		const fetchOptions = {
			method : "POST", // On choisit la méthode POST pour envoyer les données
			headers : {"Content-Type": "application/json"}, // L'objet envoyé sera au format JSON
			body : JSON.stringify(commandeUtilisateur) // On convertit notre objet order en string pour l'envoyer
		};
		//On lance la requete fetch
		fetch("http://localhost:3000/api/furniture/order", fetchOptions)
			.then((response) => response.json())
			.then((data) => {
				localStorage.clear(); // on efface les produits du LS
				sessionStorage.setItem("idCommande", JSON.stringify(data.orderId)); //On stocke l'orderId dans le LS
				sessionStorage.setItem("commande", JSON.stringify(commandeUtilisateur)); // On stocke les infos de la commande dans les LS
				sessionStorage.setItem("prixCommande", JSON.stringify(resultat));
				alert('Commande effectuée avec succès!'); 
				window.location.href = "confirmation.html";	
			})
			.catch((erreur) => {
				alert('Erreur!');
			})
	}	
})







