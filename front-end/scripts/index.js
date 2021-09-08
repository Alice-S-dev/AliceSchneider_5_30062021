

//Récupérer tous les produits depuis l'API
fetch("http://localhost:3000/api/furniture")
	.then(response => response.json())
	.then(meublesAPI => {
		//récupérer et afficher les données de chaque produit
		for(let produit in meublesAPI) { //pour chaque produit
			let articlesDispo = document.querySelector(".articles"); //je récupère l'id de la div qui contiendra tous les produits

			let carteArticle = document.createElement("div"); //je crée une div carte 
			carteArticle.className = 'card'; //je lui attribue une classe 
			articlesDispo.appendChild(carteArticle); //l'élément créé sera l'enfant de la div articles
			
			let lienArticle = document.createElement("a"); //je crée un élément lien 
			lienArticle.className ='lien-article'; //je lui attribue une classe 
			carteArticle.appendChild(lienArticle); //cet élement sera l'enfant de la div card
			lienArticle.href =`produit.html?id=${meublesAPI[produit]._id}`; // définition de l'url avec une variable 

			let divImage = document.createElement("div"); //création d'une div image
			divImage.className = 'div-image';
			lienArticle.appendChild(divImage);

			let image = document.createElement("img"); //création image
			image.className = 'div-image__img card-img-top'; 
			divImage.appendChild(image);
			image.src = meublesAPI[produit].imageUrl;

			let infosArticle = document.createElement("div"); //création d'une div pour les informations produit
			infosArticle.className = 'infos-produit m-2';
			lienArticle.appendChild(infosArticle);

			let nomArticle = document.createElement("p"); //créa d'un paragraphe pour le nom du produit
			nomArticle.className = 'infos-produit__nom';
			infosArticle.appendChild(nomArticle);
			nomArticle.innerHTML = meublesAPI[produit].name; //affichage du nom des produits

			let prixArticle = document.createElement("p"); //créa d'un paragraphe pour le prix du produit
			prixArticle.className = 'infos-produit__prix';
			infosArticle.appendChild(prixArticle);
			prixArticle.innerHTML = meublesAPI[produit].price / 100 + " €"; //affichage du prix des produits, converti en euros


			//Création d'un bouton "voir le produit" à la fin de chaque carte
			let bouton = document.createElement("button");
			bouton.className = 'btn-sm';
			bouton.style.width = "100%";
			let boutonTexte = document.createTextNode("En savoir plus");
			bouton.appendChild(boutonTexte);
			
			lienArticle.appendChild(bouton);
		}
	})

	//affichage d'un message en cas d'erreur
	.catch((erreur) => {	 
	 		let affichErreur = document.querySelector("#erreur");
	 		affichErreur.innerHTML = "Les informations demandées n'ont pas pu être affichées. <br> Veuillez vérifier que le serveur local est bien lancé (port 3000).";
	 		affichErreur.style.color = "#ba7894";
		})

