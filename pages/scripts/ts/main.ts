let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
let valueSelectedItemSpan = document.getElementById("valueSelectedItem");

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
function getValueFromLocalStorage(data: any): any {
  return localStorage.getItem(data);
}

function increaseProductQuantity(product: any): void {
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
function decreaseProductQuantity(productId: number): void {
  const removeItemBtn = document.getElementById(
    `removeItem_${productId}`
  ) as HTMLButtonElement;
  let newQuantity: HTMLElement = document.getElementById(
    `quantity_${productId}`
  );

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

function updateTotalSelectedItems(): void {
  let totalQuantity = 0;
  selectedItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  persistToLocalStorage(localStorageKeys.totalQuantity, totalQuantity);
  valueSelectedItemSpan.textContent = totalQuantity.toString();
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

fetch("http://localhost:3000/bestSeller")
  .then((response) => response.json())
  .then((data) => {
    hideLoadingOverlay();
    let productListMain = document.getElementById("product-list-main");
    let products = data.products;

    for (let category in products) {
      let categoryProducts = products[category];

      for (let j = 0; j < 3; j += 3) {
        let outerElement = document.createElement("div");
        productListMain.appendChild(outerElement);

        let categoryTitle = document.createElement("h2");
        outerElement.appendChild(categoryTitle);
        categoryTitle.innerHTML = `
        <h2 class="text-center my-4">${category}
         <button type="button" class="btn btn-secondary "><a href="category.html?category=${category}" class="text-light text-decoration-none">More</a></button>
        </h2>
        `;
        let row = document.createElement("div");
        row.classList.add("row");
        outerElement.appendChild(row);

        for (let i = 0; i < 3; i++) {
          let product = categoryProducts[i];
          let productQuantity = findItemQuantityByIdInLocalStorage(product.id);
          let productElement = document.createElement("div");
          productElement.style.width = "27rem";
          productElement.classList.add(
            "col-md-4",
            "col-12",
            "card",
            "mb-2",
            "me-2"
          );
          productElement.id = `boxContainer_${product.id}`;
          getValueFromLocalStorage(localStorageKeys.selectedItems);
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
                         onclick="decreaseProductQuantity(${product.id})"
                         style="background-color: #929fba; width: 35px;height:38px"
                       >-</button>
                     </div> 
                `;
          row.appendChild(productElement);
        }
      }
    } //carosel
    let carousel = document.getElementById("carouselDark");
    let carouselIndicators = document.getElementsByClassName(
      "carousel-indicators"
    )[0];
    let carouselInner = document.getElementsByClassName("carousel-inner")[0];
    let productBanner = data.banner;

    productBanner.forEach((item, index) => {
      let btnItem = document.createElement("button");
      btnItem.setAttribute("data-bs-target", "#carouselDark");
      btnItem.setAttribute("data-bs-slide-to", index);
      btnItem.setAttribute("aria-label", "Slide " + [index + 1]);
      carouselIndicators.appendChild(btnItem);
      if (index === 0) {
        btnItem.setAttribute("aria-current", "true");
        btnItem.classList.add("active");
      }
      let btnPrev = document.createElement("button");
      btnPrev.setAttribute("data-bs-target", "#carouselDark");
      btnPrev.setAttribute("data-bs-slide", "prev");
      btnPrev.classList.add("carousel-control-prev");
      carousel.appendChild(btnPrev);

      let sapnPrev = document.createElement("span");
      sapnPrev.setAttribute("aria-hidden", "true");
      sapnPrev.classList.add("carousel-control-prev-icon");
      btnPrev.appendChild(sapnPrev);

      let btnNext = document.createElement("button");
      btnNext.setAttribute("data-bs-target", "#carouselDark");
      btnNext.setAttribute("data-bs-slide", "next");
      btnNext.classList.add("carousel-control-next");
      carousel.appendChild(btnNext);

      let sapnNext = document.createElement("span");
      sapnNext.setAttribute("aria-hidden", "true");
      sapnNext.classList.add("carousel-control-next-icon");
      btnNext.appendChild(sapnNext);

      let carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      carouselItem.innerHTML = `
         <img src="${item.image}" class="d-block mx-auto img-fluid " alt="...">
          <div class="carousel-caption">
            <h3 class="h3-responsive">${item.name}</h3>
          </div>
      `;
      if (index === 0) {
        carouselItem.classList.add("active");
      }
      carouselInner.appendChild(carouselItem);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

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

function findItemQuantityByIdInLocalStorage(productId: number): number {
  let selectedItem = selectedItems?.find((item) => item.id === productId);
  return selectedItem ? selectedItem.quantity : 0;
}

window.addEventListener("load", function () {
  valueSelectedItemSpan.textContent = getInitialItemsQuantity().toString();
});
