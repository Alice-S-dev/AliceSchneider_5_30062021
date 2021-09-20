//Récupération des paramètres de la page (produit ciblé par son ID)
let params = new URLSearchParams(location.search);
let id = params.get('id'); // on récupère la chaine de caractère correspondant à l'ID du produit

//variables pour récupération des éléments HTML
let nomProduit = document.querySelector(".nom-produit");
let prixProduit = document.querySelector(".prix-produit");
let image = document.querySelector(".div-image__img");
let descrProduit = document.querySelector(".descr-produit"); 
let selectOptions = document.querySelector("#select-vernis");
let quantiteProduit = document.querySelector("#quantite-produit");
let bouton = document.querySelector(".bouton-ajout"); 
let messagePanier = document.querySelector('#message-panier');
let erreurQte = document.querySelector('#erreur-quantite');

//récupérer l'article
fetch('http://localhost:3000/api/furniture/' + id)
	.then(response => response.json())
	.catch((erreur) => {	 //affichage d'un message en cas d'erreur
	 		let affichErreur = document.querySelector("#erreur");
	 		affichErreur.innerHTML = "Les informations demandées n'ont pas pu être affichées. <br> Veuillez vérifier que le serveur local est bien lancé (port 3000).";
	 		affichErreur.style.color = "#ba7894";
		})
	.then(produit => {
		affichProduit(produit);
		console.log(produit);
	})

//Fonction d'affichage des informations sur le produit
function affichProduit(produit) {
	nomProduit.innerHTML = produit.name; //Affichage du nom du produit
	prixProduit.innerHTML = produit.price / 100 + " €"; //Affichage du prix du produit
	image.src = produit.imageUrl; //Affichage de l'image
	descrProduit.innerHTML = produit.description; //Affichage de la description
		
	// Gestion des options (couleurs de vernis)
		for(let option in produit.varnish) { // Pour chaque couleur de vernis, on crée une nouvelle option 
		let optionsVernis = document.createElement("option");
		selectOptions.appendChild(optionsVernis);
		optionsVernis.innerHTML = produit.varnish[option];
	}		
}

function btnClick() {
	//On écoute l'évènement du clic sur le bouton d'ajout au panier
  	bouton.addEventListener("click", () => {
	    if (quantiteProduit.value >= 1 && quantiteProduit.value <= 20) { //On borne la quantité entre 1 et 20 articles
		    //Si la quantité est correcte, on lance la fonction pour ajouter notre produit
		    ajouterProduit();
		    // Puis on réinitialise l'input de quantité à 1
		    quantiteProduit.value = 1;
		} else { //Si une mauvaise quantité de produits a été entrée, on affiche un message d'erreur
			erreurQte.style.color = "#ba7894";
			erreurQte.style.fontWeight = "bold";
			erreurQte.innerHTML = "La quantité doit être d'au moins 1 article et ne doit pas excéder 20 articles.";
			setTimeout(function() {
  				erreurQte.innerHTML = "";
			},5000);
		}
	});
}
btnClick()

function ajouterProduit() {
	// On crée le produit à ajouter
    let produitAjoute = {
      	nom: nomProduit.innerHTML,
      	image: image.src,
        prix: parseFloat(prixProduit.innerHTML),
        quantite: parseFloat(quantiteProduit.value),
        id: id,
        totalProduit : parseFloat(prixProduit.innerHTML) * parseFloat(quantiteProduit.value)
    };
    console.log(produitAjoute);
    
    // Gestion du localStorage - on initialise un tableau vide qui contiendra nos données produit(s)
    let tableauProduits = [];
      
    // Si le storage existe, on récupère son contenu qu'on ajoute au tableauProduits, et on le renvoie complété dans le LS
    if (localStorage.getItem("produits") !== null) {
		let tableauProduits = JSON.parse(localStorage.getItem("produits"));

    	// On lance la fonction pour voir si le meuble sélectionné existe déjà dans le LS et faire les modifs nécessaires
    	let produitExistant = tableauProduits.find(item => item.id === id);
    	if(produitExistant) {
    		tableauProduits = tableauProduits.map(function(item) {	//on regarde chaque item du tableau
    			if(item.id === id) { // Si l'objet est déjà existant dans le LS (on compare les ID)
    				//On change la quantité et le prix total de cet objet
    				item.quantite = parseInt(item.quantite) + parseInt(quantiteProduit.value);
    				item.totalProduit = parseInt(item.prix) * parseInt(item.quantite);
    			}
    			return item;
    		});
    		localStorage.setItem("produits", JSON.stringify(tableauProduits));
    	} else {// Si le produit n'est pas déjà présent dans le LS (ID)
    		// On ajouteun nouvel objet dans le LS  
    		tableauProduits.push(produitAjoute);
    		localStorage.setItem("produits", JSON.stringify(tableauProduits));
    	}
    } else { // Si le LS est vide, on ajoute un nouvel objet
    	tableauProduits.push(produitAjoute);
    	localStorage.setItem("produits", JSON.stringify(tableauProduits));
    } 
    // 0n confirme l'ajout au panier - durée affichage 5 secondes
	messagePanier.innerHTML = `Vous avez bien ajouté ${quantiteProduit.value} meuble(s) à votre panier!`;
	setTimeout(function() {
			messagePanier.innerHTML = "";
	},5000);
}			




