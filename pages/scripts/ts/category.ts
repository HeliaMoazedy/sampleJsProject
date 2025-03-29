import { Product } from "../../models/product.model";

let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));

enum localStorageKeys {
  selectedItems = "selectedItems",
  totalQuantity = "totalQuantity",
}

function persistToLocalStorage(key: string, data: any): void {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function getValueFromLocalStorage(key: string): any {
  return localStorage.getItem(key);
}

function increaseProductQuantity(product: Product): void {
  const removeItemBtn = document.getElementById(
    `removeItem_${product.id}`
  ) as HTMLButtonElement;
  let newQuantity: HTMLElement = document.getElementById(
    `quantity_${product.id}`
  );

  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == product.id
    );
    if (currentItemIndex !== -1) {
      selectedItems[currentItemIndex].quantity++;
      removeItemBtn.disabled = false;
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();

      persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
    } else {
      removeItemBtn.disabled = false;
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();

      removeItemBtn.disabled = false;
      selectedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
    }
  } else {
    removeItemBtn.disabled = false;
    newQuantity.textContent = "1";
    persistToLocalStorage(localStorageKeys.selectedItems, {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  }
  updateTotalSelectedItems();
}
function deceaseProductQuantity(productId: number, productPrice: number) {
  const removeItemBtn = document.getElementById(
    `removeItem_${productId}`
  ) as HTMLButtonElement;
  let newQuantity = document.getElementById(`quantity_${productId}`);

  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == productId
    );
    if (currentItemIndex !== -1) {
      if (selectedItems[currentItemIndex].quantity == 1) {
        selectedItems.splice(currentItemIndex, 1);
        newQuantity.textContent = "0";
        persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
        removeItemBtn.disabled = true;
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;

        newQuantity.textContent = (
          Number(newQuantity.textContent) - 1
        ).toString();
        persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
      }
    }
  } else {
    removeItemBtn.disabled = true;
  }
  updateTotalSelectedItems();
}

var queryParams = new URLSearchParams(window.location.search);
const category = window.location.href.split("?")[1]?.split("=")[1];
fetchAndDisplayProducts(category);

function fetchAndDisplayProducts(category: string) {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      hideLoadingOverlay();
      var productList = document.getElementById("product-list");
      productList.innerHTML = "";
      if (data.hasOwnProperty(category)) {
        var products = data[category];
        products.forEach((product) => {
          let productQuantity = findItemQuantityByIdInLocalStorage(product.id);
          var productElement = document.createElement("div");
          productElement.style.maxWidth = "26rem";
          productElement.classList.add(
            "col-md-4",
            "col-12",
            "card",
            "mb-2",
            "me-2"
          );

          productElement.innerHTML = `
          <h2 class="card-title mt-4">${product.name}</h2>
          <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
          <div class= "d-flex justify-content-center my-3">
          <p class="card-price  me-2 mt-1">Price: $${product.price}</p>
          <button
            class="btn btn-secondary me-2 " 
            onclick="increaseProductQuantity(${JSON.stringify(product).replace(/"/g, "&quot;")})"
            style="background-color: #929fba; width: 35px ; height:38px"
            >+</button>
            <h3 id="quantity_${product.id}">${productQuantity}</h3>
            <button
            
              class="btn btn-secondary ms-2"
              id="removeItem_${product.id}"
              onclick="deceaseProductQuantity(${product.id},${product.price})"
              style="background-color: #929fba; width: 35px;height:38px"
            >-</button>
          </div> 
          `;

          productList.appendChild(productElement);
        });
      } else {
        productList.innerHTML = "<p>No products found for this category.</p>";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function changeCategory(category: string): void {
  var newUrl = window.location.href.split("?")[0] + "?category=" + category;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

function hideLoadingOverlay(): void {
  const loader = document.getElementById("loader");
  const myHeader = document.getElementById("myHeader");
  const myMain = document.getElementById("myMain");
  const myFooter = document.getElementById("myFooter");

  loader.style.display = "none";
  myHeader.style.display = "block";
  myMain.style.display = "block";
  myFooter.style.display = "block";
}
function getInitialItemsQuantity(): number {
  if (selectedItems) {
    let count = 0;
    selectedItems.forEach((item) => {
      count += item.quantity;
    });
    return count;
  } else {
    return 0;
  }
}

const valueSelectedItemSpan = document.getElementById("valueSelectedItem");

window.addEventListener("load", () => {
  valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});

function updateTotalSelectedItems(): void {
  let totalQuantity = 0;
  selectedItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  persistToLocalStorage(
    localStorageKeys.totalQuantity,
    totalQuantity.toString()
  );
  valueSelectedItemSpan.textContent = totalQuantity.toString();
}
function findItemQuantityByIdInLocalStorage(productId: number): number {
  let selectedItem = selectedItems.find((item) => item.id === productId);
  return selectedItem ? selectedItem.quantity : 0;
}
