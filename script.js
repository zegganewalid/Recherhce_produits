// On commence par récupérer les produits du fichier data.mjs
import { products } from './data.mjs';

// Sélection des éléments HTML
const searchBar = document.getElementById('search-bar');
const inStockCheckbox = document.getElementById('in-stock');
const productList = document.getElementById('product-list');

// Fonction pour obtenir les catégories uniques
function getUniqueCategories(products) {
    const categories = new Set(); // Utiliser un Set pour éviter les doublons
    products.forEach(product => categories.add(product.category));
    return Array.from(categories); // Convertir le Set en tableau
}

// Fonction pour afficher les produits par catégorie
function displayProducts(filteredProducts) {
    // On vide la liste des produits avant de les réafficher
    productList.innerHTML = '';

    // Récupérer les catégories uniques directement à partir des produits
    const categories = getUniqueCategories(filteredProducts);

    categories.forEach(category => {
        // Filtrer les produits de la catégorie courante
        const categoryProducts = filteredProducts.filter(product => product.category === category);

        if (categoryProducts.length > 0) {
            // Ajouter une ligne pour la catégorie (centrée)
            const categoryRow = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            categoryCell.classList.add('category');
            categoryCell.setAttribute('colspan', 2); // Fusionner les colonnes pour la catégorie
            categoryCell.style.textAlign = 'center'; // Centrer le texte
            categoryRow.appendChild(categoryCell);
            productList.appendChild(categoryRow);

            // Afficher les produits de cette catégorie
            categoryProducts.forEach(product => {
                const productRow = document.createElement('tr');

                // Créer une cellule pour le nom du produit
                const nameCell = document.createElement('td');
                nameCell.textContent = product.name;

                // Si le produit n'est pas en stock, colorer le nom en rouge
                if (!product.stocked) {
                    nameCell.classList.add('out-of-stock');
                }

                // Créer une cellule pour le prix du produit
                const priceCell = document.createElement('td');
                priceCell.textContent = product.price;

                // Ajouter les cellules à la ligne de produit
                productRow.appendChild(nameCell);
                productRow.appendChild(priceCell);

                // Ajouter la ligne de produit à la table
                productList.appendChild(productRow);
            });
        }
    });
}

// Fonction pour filtrer les produits en fonction de la recherche et du statut de stock
function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const inStockOnly = inStockCheckbox.checked;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesStock = !inStockOnly || product.stocked;

        return matchesSearch && matchesStock;
    });

    displayProducts(filteredProducts);
}

// Écouteurs d'événements pour déclencher le filtre dès que l'utilisateur tape ou coche la case
searchBar.addEventListener('input', filterProducts);
inStockCheckbox.addEventListener('change', filterProducts);

// Afficher les produits au chargement de la page
filterProducts();
