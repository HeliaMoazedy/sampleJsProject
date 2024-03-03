function increaseValue(product) {
  if (localStorage.getItem("selectedItems")) {
    //agar asan loacal stoge bashe
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == product.id
    );
    //agar mahsol mord nazar bod
    if (currentItemIndex !== -1) {
      selectedItems[currentItemIndex].quantity++;
      document.getElementById(`removeItem_${product.id}`).disabled = false;
      let newQuantity = document.getElementById(`quantity_${product.id}`);
      newQuantity.textContent++;

      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    } // mahsol jadid bara avalin bar
    else {
      document.getElementById(`removeItem_${product.id}`).disabled = false;
      let newQuantity = document.getElementById(`quantity_${product.id}`);
      newQuantity.textContent++;

      document.getElementById(`removeItem_${product.id}`).disabled = false;
      selectedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  } //bara avalin bar ye mahsol be local storage ba in sakhtar ezafe she
  else {
    document.getElementById(`removeItem_${product.id}`).disabled = false;
    let newQuantity = document.getElementById(`quantity_${product.id}`);
    newQuantity.textContent = 1;
    localStorage.setItem(
      "selectedItems",
      JSON.stringify([
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ])
    );
  }
  updateTotalSelectedItems();
}
function deceaseValue(productId, productPrice) {
  if (localStorage.getItem("selectedItems")) {
    //agar asan loacal stoge bashe
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == productId
    );
    //agar mahsol mord nazar bod

    if (currentItemIndex !== -1) {
      if (selectedItems[currentItemIndex].quantity == 1) {
        selectedItems.splice(currentItemIndex, 1);
        let newQuantity = document.getElementById(`quantity_${productId}`);
        newQuantity.textContent = 0;
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        document.getElementById(`removeItem_${productId}`).disabled = true;
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;

        let newQuantity = document.getElementById(`quantity_${productId}`);
        newQuantity.textContent--;
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        console.log(newQuantity.textContent);
      }
    }
  } else {
    document.getElementById(`removeItem_${productId}`).style.display = true;
  }
  updateTotalSelectedItems();
}

// Construct URLSearchParams object instance from current URL querystring.
var queryParams = new URLSearchParams(window.location.search);
// Set new or modify existing parameter value.
const category = window.location.href.split("?")[1].split("=")[1];
//after ? is keapen so we choes index 1
fetchAndDisplayProducts(category);

// Function to fetch JSON data and update page content
function fetchAndDisplayProducts(category) {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      hideLoadingOverlay()
      var productList = document.getElementById("product-list");
      productList.innerHTML = ""; // Clear previous content
      if (data.hasOwnProperty(category)) {
        var products = data[category];
        products.forEach((product) => {
          let productQuantity = findItemQuantityInLocalStorageById(product.id);
          var productElement = document.createElement("div");
          productElement.style="max-width: 26rem;"
          productElement.classList.add("col-md-4", "col-12", "card", "mb-2","me-2");
          
          productElement.innerHTML =  `
          <h2 class="card-title mt-4">${product.name}</h2>
          <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
          <div class= "d-flex justify-content-center my-3">
          <p class="card-price  me-2 mt-1">Price: $${product.price}</p>
          <button
            class="btn btn-secondary me-2 " 
            onclick="increaseValue(${JSON.stringify(product).replace(/"/g, "&quot;")})"
            style="background-color: #929fba; width: 35px ; height:38px"
            >+</button>
            <h3 id="quantity_${product.id}">${productQuantity}</h3>
            <button
            
              class="btn btn-secondary ms-2"
              id="removeItem_${product.id}"
              onclick="deceaseValue(${product.id},${product.price})"
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

// Function to change category and update URL
function changeCategory(category) {
  var newUrl = window.location.href.split("?")[0] + "?category=" + category;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

function hideLoadingOverlay() {
  const loader = document.getElementById("loader");
  const myHeader = document.getElementById("myHeader");
  const myMain = document.getElementById("myMain");
  const myFooter = document.getElementById("myFooter");

  loader.style.display = "none";
  myHeader.style.display = "block";
  myMain.style.display = "block";
  myFooter.style.display = "block";
}
function getInitialItemsQuantity(){
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  if(selectedItems){
    let count = 0
    selectedItems.forEach(item => {
      count += item.quantity   
    })
    return count
  }
  else
  {
    return 0 
  }
}

window.addEventListener('load', function () {
  document.getElementById("valueSelectedItem").textContent =  getInitialItemsQuantity()
})

function updateTotalSelectedItems() {
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  let totalQuantity = 0;
  selectedItems.forEach(item => {
    totalQuantity += item.quantity;
  });
  localStorage.setItem("totalQuantity", totalQuantity);
  document.getElementById("valueSelectedItem").textContent = totalQuantity;
}
function findItemQuantityInLocalStorageById(productId) {
  let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  let selectedItem = selectedItems.find(item => item.id === productId);
  return selectedItem ? selectedItem.quantity : 0;
}
