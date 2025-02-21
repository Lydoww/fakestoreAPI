const URL = "https://fakestoreapi.com/products";

const divButtonElem = document.getElementById("sortButton");
const sortButton = document.createElement("button");
sortButton.textContent = "sort by price";
divButtonElem.appendChild(sortButton);
isAscending = true;
let products = [];

async function getProducts() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function showProducts() {
  try {
    products = await getProducts();
    renderProducts(products);
  } catch (error) {
    displayError("Something went wrond during the products render");
  }
}

function renderProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  products.forEach((product) => createCard(product));
}

function createCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const titleElem = document.createElement("h2");
  titleElem.textContent = product.title;

  const priceElem = document.createElement("p");
  priceElem.textContent = `${product.price} $`;

  const imageElem = document.createElement("img");
  imageElem.src = product.image;

  const infoElem = document.createElement("p");
  infoElem.textContent = product.description;

  productCard.append(titleElem, imageElem, infoElem, priceElem);

  document.querySelector(".products").appendChild(productCard);
}

async function sortPrice() {
  try {
    const sortedProducts = [...products].sort((a, b) =>
      isAscending ? a.price - b.price : b.price - a.price
    );

    isAscending = !isAscending;
    sortButton.textContent = isAscending
      ? "Sort by price (asc)"
      : "Sort by price (desc)";

    renderProducts(sortedProducts);
  } catch (error) {
    displayError("Something went wrong during the price sorting");
  }
}

function displayError(message) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  productsContainer.textContent = message;
}

sortButton.addEventListener("click", sortPrice);

showProducts();
