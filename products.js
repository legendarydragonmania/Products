const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
    try {
        productDOM.innerHTML = `<h4 class="product-loading">Loading...<h4>`
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id')
        
        const response = await fetch(`${url}?id=${id}`);
        const data = await response.json();
        return data
    } catch (error) {
        return `There was an error while loading the product. Please, try again later`;
    }
}

const displayProduct = (product) => {
    const { 
        company,  
        colors,
        description,
        name: title,
        price,
        image
    } = product.fields;
    const formattedPrice = `$${price/10}`;
    const { url: img } = image[0];
    document.title = title.toUpperCase();

    // colors
    const colorList = colors.map(color => {
        return `<span class="product-color" style="background-color: ${color}"></span>`
    }).join("");
    productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="${title}" />
        <div class="product-info">
        <h3>${title}</h3>
        <h5>${company}<h5>
        <span>${formattedPrice}</span>
        <div class="colors">
            ${colorList}
        </div>
        <p>
            ${description}
        </p>
        <button class="btn">add to cart</button>
        </div>
    </div>`
}

const start = async () => {
    const data = await fetchProduct();
    displayProduct(data)
}
start();