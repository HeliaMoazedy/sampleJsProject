function increaseValue(product) {
  let span = document.getElementById("valueSelectedItem");
  let currentValue = parseInt(span.textContent);
  span.textContent = currentValue + 1;
  localStorage.setItem("valueSelectedItem",span.textContent);
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
    document.getElementById(`removeItem_${product.id}`).disabled = false;

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

function deceaseValue(producId) {
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

const menuDrop = document.querySelector(".dropdown-menu");
const toggleMenu = () => menuDrop.classList.toggle("show");

window.onclick = (event) => {
  if (!event.target.matches(".icon-select")) {
    if (menuDrop.classList.contains("show")) {
      menuDrop.classList.remove("show");
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

fetch("http://localhost:3000/bestSeller")
  .then((response) => response.json())
  .then((data) => {
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
        <h2 class="text-center my-4 ">${category}
         <button type="button" class="btn btn-secondary "><a href="category.html?category=${category}" class="text-light text-decoration-none">More</a></button>
        </h2>
        `;
        let row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("flex-nowrap");
        outerElement.appendChild(row);

        for (let i = 0; i < 3; i++) {
          let product = categoryProducts[i];
          let productElement = document.createElement("div");
          productElement.classList.add("col-md-4", "col-12", "card", "mb-2","me-2");

          productElement.innerHTML = `
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

          row.appendChild(productElement);
        }
      }
    }
  })
  .catch((error) => console.error("Error loading JSON:", error));

fetch("http://localhost:3000/bestSeller")
  .then((response) => response.json())
  .then((data) => {
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
      sapnPrev.setAttribute("aria-hidden", true);
      sapnPrev.classList.add("carousel-control-prev-icon");
      btnPrev.appendChild(sapnPrev);

      let btnNext = document.createElement("button");
      btnNext.setAttribute("data-bs-target", "#carouselDark");
      btnNext.setAttribute("data-bs-slide", "next");
      btnNext.classList.add("carousel-control-next");
      carousel.appendChild(btnNext);

      let sapnNext = document.createElement("span");
      sapnNext.setAttribute("aria-hidden", true);
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
  .catch((error) => console.log("500 : Error loading JSON:", error));

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
// Get the carousel element
// Get the carousel element
let carousel = document.getElementById("carouselDark");

// Initialize Hammer.js on the carousel element
let hammer = new Hammer(carousel);

// Listen for swipe events
hammer.on("swipeleft", function() {
    // Change to the next slide when swiping left
    myCarousel.next();
});

hammer.on("swiperight", function() {
    // Change to the previous slide when swiping right
    myCarousel.prev();
});
