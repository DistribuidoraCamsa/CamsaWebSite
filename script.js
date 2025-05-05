document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];

    $('#filter-category').select2({ placeholder: "Selecciona una categoría" });
    $('#filter-vehicle').select2({ placeholder: "Selecciona un vehículo" });

    loadProducts();

    async function loadProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');

            allProducts = await response.json();

            filterProducts(); ales
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    function filterProducts() {
        const selectedCategory = document.getElementById('filter-category').value;
        const selectedVehicle = document.getElementById('filter-vehicle').value;

        const filtered = allProducts.filter(product =>
            (selectedCategory === 'all' || product.categoria === selectedCategory) &&
            (selectedVehicle === 'all' ||
                product.vehiculo === selectedVehicle ||
                product.vehiculo2 === selectedVehicle ||
                product.vehiculo3 === selectedVehicle ||
                product.vehiculo4 === selectedVehicle)
        );

        displayProducts(filtered);
    }

    function displayProducts(products) {
        const container = document.getElementById('product-container');
        if (!container) {
            console.error("No se encontró el contenedor de productos.");
            return;
        }

        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = '<p class="no-products">No se encontraron productos. Intente con otra categoría.</p>';
            return;
        }

        try {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                if (product.stock === "No Disponible") {
                    productDiv.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
                    <h3 class="product-style">${product.nombre}</h3>
                    // <strong><p class="product-style">Precio: ${product.precio}</p></strong>
                    <p class="product-style">Categoría: ${product.categoria}</p>
                    <p class="product-style">Marca: ${product.marca}</p>
                    <p class="product-style">Codigo: ${product.codigo}</p>
                    // <strong><p class="product-style">Sin Stock</p></strong>
                `;
                container.appendChild(productDiv);
                } else if(product.stock === "Disponible") {
                    productDiv.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
                    <h3 class="product-style">${product.nombre}</h3>
                    // <strong><p class="product-style">Precio: ${product.precio}</p></strong>
                    <p class="product-style">Categoría: ${product.categoria}</p>
                    <p class="product-style">Marca: ${product.marca}</p>
                    <p class="product-style">Codigo: ${product.codigo}</p>
                    // <strong><p class="product-style">Disponible</p></strong>
                    `;
                    container.appendChild(productDiv);
                }
            });
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    // Filtrar automáticamente cuando cambian los selects
    document.getElementById('filter-category').addEventListener('change', filterProducts);
    document.getElementById('filter-vehicle').addEventListener('change', filterProducts);

    // Si decides mantener el botón, este vuelve a cargar todos los productos
    document.getElementById('load-products').addEventListener('click', loadProducts);
});

