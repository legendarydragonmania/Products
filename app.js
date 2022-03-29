const url = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector(".products-center");

const fetchProducts = async () => {
    productsDOM.innerHTML = `<div class="loading"></div>`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        productsDOM.innerHTML = `<p class="error">there was an error</p>`
    }
}


const displayProducts = (list) => {
    const productsList = list.map((item) => {
        const { id } = item;
        const { name: title, price } = item.fields;
        const { url: image } = item.fields.image[0];
        const formattedPrice = price/10
        return `
            <a class="single-product" href="product.html?id=${id}">
            <img src="${image}" class="single-product-img img" alt="${title}"/>
            <footer>
                <h5 class="name">${title}</h5>
                <span class="price">$${formattedPrice}</span>
            </footer>
            </a>
            `
    }).join("");
    productsDOM.innerHTML = `<div class="products-container">
        ${productsList}
    </div>`
}

const start = async () =>  {
    const data = await fetchProducts();
    displayProducts(data)
}

start();    