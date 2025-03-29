var selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
var valueSelectedItemSpan = document.getElementById("valueSelectedItem");
var localStorageKeys;
(function (localStorageKeys) {
  localStorageKeys["selectedItems"] = "selectedItems";
  localStorageKeys["totalQuantity"] = "totalQuantity";
})(localStorageKeys || (localStorageKeys = {}));
function persistToLocalStorage(key, data) {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
function getValueFromLocalStorage(data) {
  return localStorage.getItem(data);
}
function increaseProductQuantity(product) {
  var removeItemBtn = document.getElementById("removeItem_".concat(product.id));
  var newQuantity = document.getElementById("quantity_".concat(product.id));
  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    var currentItemIndex = selectedItems.findIndex(function (item) {
      return item.id == product.id;
    });
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
function decreaseProductQuantity(productId) {
  var removeItemBtn = document.getElementById("removeItem_".concat(productId));
  var newQuantity = document.getElementById("quantity_".concat(productId));
  if (getValueFromLocalStorage(localStorageKeys.selectedItems)) {
    var currentItemIndex = selectedItems.findIndex(function (item) {
      return item.id == productId;
    });
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
function updateTotalSelectedItems() {
  var totalQuantity = 0;
  selectedItems.forEach(function (item) {
    totalQuantity += item.quantity;
  });
  persistToLocalStorage(localStorageKeys.totalQuantity, totalQuantity);
  valueSelectedItemSpan.textContent = totalQuantity.toString();
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
fetch("http://localhost:3000/bestSeller")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    hideLoadingOverlay();
    var productListMain = document.getElementById("product-list-main");
    var products = data.products;
    for (var category in products) {
      var categoryProducts = products[category];
      for (var j = 0; j < 3; j += 3) {
        var outerElement = document.createElement("div");
        productListMain.appendChild(outerElement);
        var categoryTitle = document.createElement("h2");
        outerElement.appendChild(categoryTitle);
        categoryTitle.innerHTML = '\n        <h2 class="text-center my-4">'
          .concat(
            category,
            '\n         <button type="button" class="btn btn-secondary "><a href="category.html?category='
          )
          .concat(
            category,
            '" class="text-light text-decoration-none">More</a></button>\n        </h2>\n        '
          );
        var row = document.createElement("div");
        row.classList.add("row");
        outerElement.appendChild(row);
        for (var i = 0; i < 3; i++) {
          var product = categoryProducts[i];
          var productQuantity = findItemQuantityByIdInLocalStorage(product.id);
          var productElement = document.createElement("div");
          productElement.style.width = "27rem";
          productElement.classList.add(
            "col-md-4",
            "col-12",
            "card",
            "mb-2",
            "me-2"
          );
          productElement.id = "boxContainer_".concat(product.id);
          getValueFromLocalStorage(localStorageKeys.selectedItems);
          productElement.innerHTML =
            '\n                <h2 class="card-title mt-4">'
              .concat(
                product.name,
                '</h2>\n                <img class= "mx-auto  d-block card-image-top rounded mt-2" src="'
              )
              .concat(product.image, '" alt="')
              .concat(
                product.name,
                '">\n                <div class= "d-flex justify-content-center my-3">\n                     <p class="card-price  me-2 mt-1">Price: $'
              )
              .concat(
                product.price,
                '</p>\n                     <button\n                       class="btn btn-secondary me-2 " \n                       onclick="increaseProductQuantity('
              )
              .concat(
                JSON.stringify(product).replace(/"/g, "&quot;"),
                ')"\n                       style="background-color: #929fba; width: 35px ; height:38px"\n                       >+</button>\n                       <h3 id="quantity_'
              )
              .concat(product.id, '">')
              .concat(
                productQuantity,
                '</h3>\n                       <button\n                       \n                         class="btn btn-secondary ms-2"\n                         id="removeItem_'
              )
              .concat(
                product.id,
                '"\n                         onclick="decreaseProductQuantity('
              )
              .concat(
                product.id,
                ')"\n                         style="background-color: #929fba; width: 35px;height:38px"\n                       >-</button>\n                     </div> \n                '
              );
          row.appendChild(productElement);
        }
      }
    } //carosel
    var carousel = document.getElementById("carouselDark");
    var carouselIndicators = document.getElementsByClassName(
      "carousel-indicators"
    )[0];
    var carouselInner = document.getElementsByClassName("carousel-inner")[0];
    var productBanner = data.banner;
    productBanner.forEach(function (item, index) {
      var btnItem = document.createElement("button");
      btnItem.setAttribute("data-bs-target", "#carouselDark");
      btnItem.setAttribute("data-bs-slide-to", index);
      btnItem.setAttribute("aria-label", "Slide " + [index + 1]);
      carouselIndicators.appendChild(btnItem);
      if (index === 0) {
        btnItem.setAttribute("aria-current", "true");
        btnItem.classList.add("active");
      }
      var btnPrev = document.createElement("button");
      btnPrev.setAttribute("data-bs-target", "#carouselDark");
      btnPrev.setAttribute("data-bs-slide", "prev");
      btnPrev.classList.add("carousel-control-prev");
      carousel.appendChild(btnPrev);
      var sapnPrev = document.createElement("span");
      sapnPrev.setAttribute("aria-hidden", "true");
      sapnPrev.classList.add("carousel-control-prev-icon");
      btnPrev.appendChild(sapnPrev);
      var btnNext = document.createElement("button");
      btnNext.setAttribute("data-bs-target", "#carouselDark");
      btnNext.setAttribute("data-bs-slide", "next");
      btnNext.classList.add("carousel-control-next");
      carousel.appendChild(btnNext);
      var sapnNext = document.createElement("span");
      sapnNext.setAttribute("aria-hidden", "true");
      sapnNext.classList.add("carousel-control-next-icon");
      btnNext.appendChild(sapnNext);
      var carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      carouselItem.innerHTML = '\n         <img src="'
        .concat(
          item.image,
          '" class="d-block mx-auto img-fluid " alt="...">\n          <div class="carousel-caption">\n            <h3 class="h3-responsive">'
        )
        .concat(item.name, "</h3>\n          </div>\n      ");
      if (index === 0) {
        carouselItem.classList.add("active");
      }
      carouselInner.appendChild(carouselItem);
    });
  })
  .catch(function (error) {
    return console.error("Error loading JSON:", error);
  });
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
function findItemQuantityByIdInLocalStorage(productId) {
  var selectedItem =
    selectedItems === null || selectedItems === void 0
      ? void 0
      : selectedItems.find(function (item) {
          return item.id === productId;
        });
  return selectedItem ? selectedItem.quantity : 0;
}
window.addEventListener("load", function () {
  valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});
