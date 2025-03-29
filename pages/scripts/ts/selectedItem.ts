import { Product } from "../../models/product.model";

let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
let valueSelectedItemSpan = document.getElementById("valueSelectedItem");
const selectedItemsMain = getValueFromLocalStorage("selectedItems");

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

enum localStorageKeys {
  selectedItems = "selectedItems",
  totalQuantity = "totalQuantity",
  valueSelectedItem = "valueSelectedItem",
  valueSelectedItemCategory = "valueSelectedItemCategory",
}

function increaseProductQuantity(product: Product): void {
  const removeItemBtn = document.getElementById(
    `removeItem_${product.id}`
  ) as HTMLButtonElement;
  let newQuantity: HTMLElement = document.getElementById(
    `quantity_${product.id}`
  );
  let totalPriceElement = document.getElementById(`Totall_${product.id}`);

  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == product.id
    );
    if (currentItemIndex !== -1) {
      selectedItems[currentItemIndex].quantity++;
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();

      let totalPrice = product.price * parseInt(newQuantity.textContent);
      totalPriceElement.textContent = "Totall:$ " + totalPrice;
      persistToLocalStorage("selectedItems", selectedItems);
    } else {
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();

      let totalPrice = product.price * parseInt(newQuantity.textContent);
      totalPriceElement.textContent = "Totall:$ " + totalPrice;
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
    persistToLocalStorage(localStorageKeys.selectedItems, [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      },
    ]);
  }
  updateTotalSelectedItems();
}
function decreaseProductQuantity(productId, productPrice) {
  const removeItemBtn = document.getElementById(
    `removeItem_${productId}`
  ) as HTMLButtonElement;
  let newQuantity: HTMLElement = document.getElementById(
    `quantity_${productId}`
  );
  let totalPriceElement = document.getElementById(`Totall_${productId}`);

  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == productId
    );

    if (currentItemIndex !== -1) {
      if (selectedItems[currentItemIndex].quantity == 1) {
        selectedItems.splice(currentItemIndex, 1);
        newQuantity.textContent = "0";
        totalPriceElement.textContent = "Totall:$ " + 0;
        persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
        removeItemBtn.disabled = true;
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;

        newQuantity.textContent = (
          Number(newQuantity.textContent) - 1
        ).toString();

        let totalPriceElement = document.getElementById(`Totall_${productId}`);
        let totalPrice = productPrice * parseInt(newQuantity.textContent);
        totalPriceElement.textContent = "Totall:$ " + totalPrice;
        persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
      }
    }
  } else {
    removeItemBtn.disabled = true;
  }
  updateTotalSelectedItems();
}

function updateTotalSelectedItems(): void {
  let totalQuantity = 0;
  selectedItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  valueSelectedItemSpan.textContent = totalQuantity.toString();
}

if (selectedItemsMain) {
  selectedItems = JSON.parse(selectedItemsMain);

  for (let i = 0; i < selectedItems.length; i++) {
    const product = selectedItems[i];

    let selectedItemsContainer = document.getElementById("selectedItem");
    let productElement = document.createElement("div");
    productElement.style.maxWidth = "26rem";
    productElement.classList.add("col-md-4", "col-12", "card", "mb-2", "me-2");
    productElement.id = `boxContainer_${product.id}`;

    productElement.innerHTML = `
                      <div class ="d-flex justify-content-center "><h2 class="card-title mt-4 me-3">${product.name}</h2>
                      </div>
                      <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
                     <div class= "d-flex justify-content-center my-3">
                     <p class="card-price  me-2 mt-1">Price: $${product.price}</p>
                     <button
                       class="btn btn-secondary me-2 " 
                       onclick="increaseProductQuantity(${product.id})"
                       style="background-color: #929fba; width: 35px ; height:38px"
                       >+</button>
                       <h3 id="quantity_${product.id}">${product.quantity}</h3>
                       <button
                         class="btn btn-secondary ms-2"
                         id="removeItem_${product.id}"
                         onclick="decreaseProductQuantity(${product.id},${product.price})"
                         style="background-color: #929fba; width: 35px;height:38px"
                       >-</button>
                     </div> 
                     <p class="card-price mt-1" id="Totall_${product.id}">Totall: $${product.price * product.quantity}</p>
                      `;

    selectedItemsContainer.appendChild(productElement);
  }
}

let storedValue = getValueFromLocalStorage(localStorageKeys.valueSelectedItem);
let storedValueCategory = getValueFromLocalStorage(
  localStorageKeys.valueSelectedItemCategory
);
if (storedValue) {
  valueSelectedItemSpan.textContent = (
    Number(storedValue) + Number(storedValueCategory)
  ).toString();
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

window.addEventListener("load", function () {
  valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});
