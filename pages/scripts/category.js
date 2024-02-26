function inceaseValue() {
  let span = document.getElementById("valueSelectedItem");
  let currentValue = parseInt(span.textContent);
  span.textContent = currentValue + 1;
}
function deceaseValue() {
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


// Handle click event for dropdown items
// document.querySelectorAll(".dropdown-item").forEach((item) => {
//   item.addEventListener("click", function () {
//     const selectedItem = this.querySelector("i").cloneNode(true);
//     document.querySelector(".icon-select").innerHTML =
//       selectedItem.outerHTML;
//     document.querySelector(".dropdown-menu").classList.remove("show");
//   });
// });

document.addEventListener("click", function (event) {
  const menu = document.getElementById("staticBackdrop");
  const body = document.querySelector(".offcanvas-body");
  if (!menu.contains(event.target) && !body.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// document.addEventListener("click", function (event) {
//   const dropdown = document.querySelector(".dropdown-menu");
//   const icon = document.querySelector(".icon-select");
//   if (!dropdown.contains(event.target) ) {
//     dropdown.classList.remove("show");
//   }
// });
// Construct URLSearchParams object instance from current URL querystring.
var queryParams = new URLSearchParams(window.location.search);
// Set new or modify existing parameter value.
const category = window.location.href.split("?")[1].split("=")[1];
//after ? is keapen so we choes index 1
fetchAndDisplayProducts(category);

// // Replace current querystring with the new one.
// history.replaceState(null, null, "?" + queryParams.toString());

// // Function to parse URL parameters ?
// function getUrlParameter(name) {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//   var results = regex.exec(location.search);
//   return results === null
//     ? ""
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

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
          productElement.classList.add("col-lg-4", "col-12", "card");

          productElement.innerHTML = `
                      <h2 class="card-title hide-text mt-4">${product.name}</h2>
                      <img class= "mx-auto  d-block card-image-top rounded mt-2 skeleton" src="${product.image}" alt="${product.name}">
                      <p class="card-price hide-text  me-2 my-4">Price: $${product.price}
                        <a
                        href="#"
                        class="btn btn-secondary btn-increase "
                        onclick="inceaseValue()"
                        style="background-color: #929fba; width: 35px"
                      >+</a>
                      <a
                        href="#"
                        class="btn btn-secondary btn-decrease"
                        id="removeItem"
                        onclick="deceaseValue()"
                        style="background-color: #929fba; width: 35px"
                      >-</a>
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
