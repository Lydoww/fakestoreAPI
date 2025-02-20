const URL = "https://fakestoreapi.com/products";

const divButtonElem = document.getElementById('sortButton')
const sortButton = document.createElement('button')
sortButton.textContent = 'sort by price'
divButtonElem.appendChild(sortButton)


async function getProducts() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

console.log(getProducts());

async function showProducts() {
  const products = await getProducts();
  products.forEach((product) => {
    createCard(product);
  });
}

function createCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const titleElem = document.createElement("h2");
  titleElem.innerHTML = product.title;

  const priceElem = document.createElement("p");
  priceElem.innerHTML = `${product.price} $`;

  const imageElem = document.createElement("img");
  imageElem.src = product.image;

  const infoElem = document.createElement("p");
  infoElem.innerHTML = product.description;
  
  productCard.append(titleElem, imageElem, infoElem, priceElem);

  document.querySelector(".products").appendChild(productCard);
}

function sortPrice() {

}

sortButton.addEventListener('click', sortPrice())

showProducts();
