function increaseValue(product) {
  let span = document.getElementById("valueSelectedItem");
  let currentValue = parseInt(span.textContent);
  span.textContent = currentValue + 1;
  localStorage.setItem("valueSelectedItemCategory",span.textContent);

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

      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    } // mahsol jadid bara avalin bar
    else {
      document.getElementById(`removeItem_${product.id}`).disabled = false;
      selectedItems.push({
        id: product.id,
        name : product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  } //bara avalin bar ye mahsol be local storage ba in sakhtar ezafe she
  else {
    localStorage.setItem(
      "selectedItems",
      JSON.stringify([
        {
          id: product.id,
          name : product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ])
    );
  }
}
function deceaseValue(producId, productPrice) {
  if (localStorage.getItem("selectedItems")) {
    //agar asan loacal stoge bashe
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    const currentItemIndex = selectedItems.findIndex(
      (item) => item.id == producId
    );
    //agar mahsol mord nazar bod

    if (currentItemIndex !== -1) {
      if (selectedItems[currentItemIndex].quantity == 1) {
        selectedItems.splice(currentItemIndex, 1);
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        document.getElementById(`removeItem_${producId}`).disabled = true;
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;
        
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      }
    }
  } else {

    document.getElementById(`removeItem_${producId}`).style.display = true;
  }

  let span = document.getElementById("valueSelectedItem");
  let currentValue = parseInt(span.textContent);
  if (currentValue !== 0) span.textContent = currentValue - 1;

}

// Handle click event for dropdown toggle
const menu = document.querySelector(".dropdown-menu");

const toggleMenu = () => menu.classList.toggle("show");

window.onclick = (event) => {
  if (!event.target.matches(".icon-select")) {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
    }
  }
};

document.addEventListener("click", function (event) {
  const menu = document.getElementById("staticBackdrop");
  const body = document.querySelector(".offcanvas-body");
  if (!menu.contains(event.target) && !body.contains(event.target)) {
    menu.classList.remove("show");
  }
});


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
      var productList = document.getElementById("product-list");
      productList.innerHTML = ""; // Clear previous content
      if (data.hasOwnProperty(category)) {
        var products = data[category];
        products.forEach((product) => {
          var productElement = document.createElement("div");
          productElement.classList.add("col-lg-4", "col-12", "card", "mb-2");

          productElement.innerHTML =  `
          <h2 class="card-title mt-4">${product.name}</h2>
          <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
          <p class="card-price  me-2 my-4">Price: $${product.price}
          <button
            class="btn btn-secondary " 
            onclick="increaseValue(${JSON.stringify(product).replace(/"/g, "&quot;")})"
            style="background-color: #929fba; width: 35px"
            >+</button>
            <button
            disabled="disabled"
              class="btn btn-secondary"
              id="removeItem_${product.id}"
              onclick="deceaseValue(${product.id})"
              style="background-color: #929fba; width: 35px;"
            >-</button>
            </p>
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

function loadFunction() {
  let load = setTimeout(showFunction, 1500);
}
function showFunction() {
  const loader = document.getElementById("loader");
  const myHeader = document.getElementById("myHeader");
  const myMain = document.getElementById("myMain");
  const myFooter = document.getElementById("myFooter");

  loader.style.display = "none";
  myHeader.style.display = "block";
  myMain.style.display = "block";
  myFooter.style.display = "block";
}
