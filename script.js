const URL = "https://fakestoreapi.com/products";

const divButtonElem = document.getElementById("sortButton");
const sortButton = document.createElement("button");
sortButton.textContent = "sort by price";
divButtonElem.appendChild(sortButton);

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
    const products = await getProducts();
    products.forEach((product) => {
      createCard(product);
    });
  } catch (error) {
    displayError("Something went wrond during the products render");
  }
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

async function sortPrice() {
  try {
    const products = await getProducts();
    const sortedProducts = products.sort((a, b) => a.price - b.price);

    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";
    sortedProducts.forEach((product) => createCard(product));
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
