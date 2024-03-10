"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
var localStorageKeys;
(function (localStorageKeys) {
    localStorageKeys["selectedItems"] = "selectedItems";
    localStorageKeys["totalQuantity"] = "totalQuantity";
})(localStorageKeys || (localStorageKeys = {}));
function persistToLocalStorage(key, data) {
    if (typeof data === "string") {
        localStorage.setItem(key, data);
    }
    else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}
function increaseProductQuantity(product) {
    var removeItemBtn = document.getElementById("removeItem_".concat(product.id));
    var newQuantity = document.getElementById("quantity_".concat(product.id));
    if (getValueFromLocalStorage("selectedItems")) {
        var currentItemIndex = selectedItems.findIndex(function (item) { return item.id == product.id; });
        if (currentItemIndex !== -1) {
            selectedItems[currentItemIndex].quantity++;
            removeItemBtn.disabled = false;
            newQuantity.textContent = (Number(newQuantity.textContent) + 1).toString();
            persistToLocalStorage("selectedItems", selectedItems);
        }
        else {
            removeItemBtn.disabled = false;
            newQuantity.textContent = (Number(newQuantity.textContent) + 1).toString();
            removeItemBtn.disabled = false;
            selectedItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
            });
            persistToLocalStorage("selectedItems", selectedItems);
        }
    }
    else {
        removeItemBtn.disabled = false;
        newQuantity.textContent = "1";
        persistToLocalStorage("selectedItems", {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        });
    }
    updateTotalSelectedItems();
}
function deceaseProductQuantity(productId, productPrice) {
    var removeItemBtn = document.getElementById("removeItem_".concat(productId));
    var newQuantity = document.getElementById("quantity_".concat(productId));
    if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
        var currentItemIndex = selectedItems.findIndex(function (item) { return item.id == productId; });
        if (currentItemIndex !== -1) {
            if (selectedItems[currentItemIndex].quantity == 1) {
                selectedItems.splice(currentItemIndex, 1);
                newQuantity.textContent = "0";
                persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
                removeItemBtn.disabled = true;
            }
            else if (selectedItems[currentItemIndex].quantity > 1) {
                selectedItems[currentItemIndex].quantity--;
                newQuantity.textContent = (Number(newQuantity.textContent) - 1).toString();
                persistToLocalStorage(localStorageKeys.selectedItems, selectedItems);
            }
        }
    }
    else {
        removeItemBtn.disabled = true;
    }
    updateTotalSelectedItems();
}
var queryParams = new URLSearchParams(window.location.search);
var category = (_a = window.location.href.split("?")[1]) === null || _a === void 0 ? void 0 : _a.split("=")[1];
fetchAndDisplayProducts(category);
function fetchAndDisplayProducts(category) {
    fetch("http://localhost:3000/products")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        hideLoadingOverlay();
        var productList = document.getElementById("product-list");
        productList.innerHTML = "";
        if (data.hasOwnProperty(category)) {
            var products = data[category];
            products.forEach(function (product) {
                var productQuantity = findItemQuantityByIdInLocalStorage(product.id);
                var productElement = document.createElement("div");
                productElement.style.maxWidth = "26rem";
                productElement.classList.add("col-md-4", "col-12", "card", "mb-2", "me-2");
                productElement.innerHTML = "\n          <h2 class=\"card-title mt-4\">".concat(product.name, "</h2>\n          <img class= \"mx-auto  d-block card-image-top rounded mt-2\" src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\">\n          <div class= \"d-flex justify-content-center my-3\">\n          <p class=\"card-price  me-2 mt-1\">Price: $").concat(product.price, "</p>\n          <button\n            class=\"btn btn-secondary me-2 \" \n            onclick=\"increaseProductValue(").concat(JSON.stringify(product).replace(/"/g, "&quot;"), ")\"\n            style=\"background-color: #929fba; width: 35px ; height:38px\"\n            >+</button>\n            <h3 id=\"quantity_").concat(product.id, "\">").concat(productQuantity, "</h3>\n            <button\n            \n              class=\"btn btn-secondary ms-2\"\n              id=\"removeItem_").concat(product.id, "\"\n              onclick=\"deceaseProductValue(").concat(product.id, ",").concat(product.price, ")\"\n              style=\"background-color: #929fba; width: 35px;height:38px\"\n            >-</button>\n          </div> \n          ");
                productList.appendChild(productElement);
            });
        }
        else {
            productList.innerHTML = "<p>No products found for this category.</p>";
        }
    })
        .catch(function (error) { return console.error("Error fetching data:", error); });
}
function changeCategory(category) {
    var newUrl = window.location.href.split("?")[0] + "?category=" + category;
    window.history.pushState({ path: newUrl }, "", newUrl);
}
function hideLoadingOverlay() {
    var loader = document.getElementById("loader");
    var myHeader = document.getElementById("myHeader");
    var myMain = document.getElementById("myMain");
    var myFooter = document.getElementById("myFooter");
    loader.style.display = "none";
    myHeader.style.display = "block";
    myMain.style.display = "block";
    myFooter.style.display = "block";
}
function getInitialItemsQuantity() {
    if (selectedItems) {
        var count_1 = 0;
        selectedItems.forEach(function (item) {
            count_1 += item.quantity;
        });
        return count_1;
    }
    else {
        return 0;
    }
}
var valueSelectedItemSpan = document.getElementById("valueSelectedItem");
window.addEventListener("load", function () {
    valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});
function updateTotalSelectedItems() {
    var totalQuantity = 0;
    selectedItems.forEach(function (item) {
        totalQuantity += item.quantity;
    });
    persistToLocalStorage(localStorageKeys.totalQuantity, totalQuantity.toString());
    valueSelectedItemSpan.textContent = totalQuantity.toString();
}
function findItemQuantityByIdInLocalStorage(productId) {
    var selectedItem = selectedItems.find(function (item) { return item.id === productId; });
    return selectedItem ? selectedItem.quantity : 0;
}
