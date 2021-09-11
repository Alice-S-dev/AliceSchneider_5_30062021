let contenuStorage = JSON.parse(localStorage.getItem("produits"));

// CALCUL DE LA QUANTITE D'ARTICLES DANS LE PANIER (POUR LE HEADER)
let chiffrePanier = document.getElementById("chiffre-panier"); // On récupère l'élément html où sera affiché la quantité
if (contenuStorage !== null) {
	let qteTableau = []; // Initialisation d'un tableau vide pour y mettre les quantités des produits du panier
	for(let produit in contenuStorage) { //pour chaque produit présent dans le LS
		// Pour calcul de la quantité d'articles dans le panier
		let qteProduitsPanier = contenuStorage[produit].quantite; // On récupère la quantité
		qteTableau.push(qteProduitsPanier); // on ajoute la quantité dans le tableau
	}
	//on utilise la méthode reduce(), qui va accumuler les différentes valeurs pour n'en faire plus qu'une
	//ici on veut additionner toutes les valeurs qui sont dans notre tableau des quantités
	let reducteur = (accumulateur, valeur) => accumulateur + valeur; 
	let resultat = (qteTableau.reduce(reducteur, 0)); // On ajoute une valeur initiale de 0 pour eviter l'erreur si le tableau est vide
	chiffrePanier.innerHTML = resultat; //on affiche le résultat
} else {
	chiffrePanier.innerHTML = "0";
}
