"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
var valueSelectedItemSpan = document.getElementById("valueSelectedItem");
var selectedItemsMain = getValueFromLocalStorage("selectedItems");
function persistToLocalStorage(key, data) {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
function getValueFromLocalStorage(key) {
  return localStorage.getItem(key);
}
var localStorageKeys;
(function (localStorageKeys) {
  localStorageKeys["selectedItems"] = "selectedItems";
  localStorageKeys["totalQuantity"] = "totalQuantity";
  localStorageKeys["valueSelectedItem"] = "valueSelectedItem";
  localStorageKeys["valueSelectedItemCategory"] = "valueSelectedItemCategory";
})(localStorageKeys || (localStorageKeys = {}));
function increaseProductQuantity(productId) {
  var removeItemBtn = document.getElementById("removeItem_".concat(productId));
  var newQuantity = document.getElementById("quantity_".concat(productId));
  var totalPriceElement = document.getElementById("Totall_".concat(productId));
  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    var currentItemIndex = selectedItems.findIndex(function (item) {
      return item.id == productId;
    });
    if (currentItemIndex !== -1) {
      selectedItems[currentItemIndex].quantity++;
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();
      var totalPrice = product.price * parseInt(newQuantity.textContent);
      totalPriceElement.textContent = "Totall:$ " + totalPrice;
      persistToLocalStorage("selectedItems", selectedItems);
    } else {
      newQuantity.textContent = (
        Number(newQuantity.textContent) + 1
      ).toString();
      var totalPrice = product.price * parseInt(newQuantity.textContent);
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
  var removeItemBtn = document.getElementById("removeItem_".concat(productId));
  var newQuantity = document.getElementById("quantity_".concat(productId));
  var totalPriceElement = document.getElementById("Totall_".concat(productId));
  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    var currentItemIndex = selectedItems.findIndex(function (item) {
      return item.id == productId;
    });
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
        var totalPriceElement_1 = document.getElementById(
          "Totall_".concat(productId)
        );
        var totalPrice = productPrice * parseInt(newQuantity.textContent);
        totalPriceElement_1.textContent = "Totall:$ " + totalPrice;
        persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
      }
    }
  } else {
    removeItemBtn.disabled = true;
  }
  updateTotalSelectedItems();
}
function updateTotalSelectedItems() {
  var totalQuantity = 0;
  selectedItems.forEach(function (item) {
    totalQuantity += item.quantity;
  });
  valueSelectedItemSpan.textContent = totalQuantity.toString();
}
if (selectedItemsMain) {
  selectedItems = JSON.parse(selectedItemsMain);
  for (var i = 0; i < selectedItems.length; i++) {
    var product = selectedItems[i];
    var selectedItemsContainer = document.getElementById("selectedItem");
    var productElement = document.createElement("div");
    productElement.style.maxWidth = "26rem";
    productElement.classList.add("col-md-4", "col-12", "card", "mb-2", "me-2");
    productElement.id = "boxContainer_".concat(product.id);
    productElement.innerHTML =
      '\n                      <div class ="d-flex justify-content-center "><h2 class="card-title mt-4 me-3">'
        .concat(
          product.name,
          '</h2>\n                      </div>\n                      <img class= "mx-auto  d-block card-image-top rounded mt-2" src="'
        )
        .concat(product.image, '" alt="')
        .concat(
          product.name,
          '">\n                     <div class= "d-flex justify-content-center my-3">\n                     <p class="card-price  me-2 mt-1">Price: $'
        )
        .concat(
          product.price,
          '</p>\n                     <button\n                       class="btn btn-secondary me-2 " \n                       onclick="increaseProductQuantity('
        )
        .concat(
          product.id,
          ')"\n                       style="background-color: #929fba; width: 35px ; height:38px"\n                       >+</button>\n                       <h3 id="quantity_'
        )
        .concat(product.id, '">')
        .concat(
          product.quantity,
          '</h3>\n                       <button\n                         class="btn btn-secondary ms-2"\n                         id="removeItem_'
        )
        .concat(
          product.id,
          '"\n                         onclick="decreaseProductQuantity('
        )
        .concat(product.id, ",")
        .concat(
          product.price,
          ')"\n                         style="background-color: #929fba; width: 35px;height:38px"\n                       >-</button>\n                     </div> \n                     <p class="card-price mt-1" id="Totall_'
        )
        .concat(product.id, '">Totall: $')
        .concat(
          product.price * product.quantity,
          "</p>\n                      "
        );
    selectedItemsContainer.appendChild(productElement);
  }
}
var storedValue = getValueFromLocalStorage(localStorageKeys.valueSelectedItem);
var storedValueCategory = getValueFromLocalStorage(
  localStorageKeys.valueSelectedItemCategory
);
if (storedValue) {
  valueSelectedItemSpan.textContent = (
    Number(storedValue) + Number(storedValueCategory)
  ).toString();
}
function getInitialItemsQuantity() {
  if (selectedItems) {
    var count_1 = 0;
    selectedItems.forEach(function (item) {
      count_1 += item.quantity;
    });
    return count_1;
  } else {
    return 0;
  }
}
window.addEventListener("load", function () {
  valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});
window.increaseProductQuantity = increaseProductQuantity;
window.decreaseProductQuantity = decreaseProductQuantity;
