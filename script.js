import { products } from './data.mjs';

const searchBar = document.getElementById('search-bar');
const inStockCheckbox = document.getElementById('in-stock');
const productList = document.getElementById('product-list');

function getUniqueCategories(products) {
    const categories = new Set(); 
    products.forEach(product => categories.add(product.category));
    return Array.from(categories);
}

function displayProducts(filteredProducts) {
    productList.innerHTML = '';

    const categories = getUniqueCategories(filteredProducts);

    categories.forEach(category => {
        const categoryProducts = filteredProducts.filter(product => product.category === category);

        if (categoryProducts.length > 0) {
            const categoryRow = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            categoryCell.classList.add('category');
            categoryCell.setAttribute('colspan', 2); 
            categoryCell.style.textAlign = 'center';
            categoryRow.appendChild(categoryCell);
            productList.appendChild(categoryRow);

            categoryProducts.forEach(product => {
                const productRow = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = product.name;

                if (!product.stocked) {
                    nameCell.classList.add('out-of-stock');
                }

                const priceCell = document.createElement('td');
                priceCell.textContent = product.price;

                productRow.appendChild(nameCell);
                productRow.appendChild(priceCell);

                productList.appendChild(productRow);
            });
        }
    });
}

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

searchBar.addEventListener('input', filterProducts);
inStockCheckbox.addEventListener('change', filterProducts);

filterProducts();