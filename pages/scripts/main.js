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
document.querySelector(".icon-select").addEventListener("click", function () {
  document.querySelector(".dropdown-menu").classList.toggle("show");
});

document.addEventListener("click", function (event) {
  const menu = document.getElementById("staticBackdrop");
  const body = document.querySelector(".offcanvas-body");
  if (!menu.contains(event.target) && !body.contains(event.target)) {
    menu.classList.remove("show");
  }
});
fetch("../bestSeller.json")
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
        outerElement.appendChild(row);

        for (let i = 0; i < 3; i++) {
          let product = categoryProducts[i];
          let productElement = document.createElement("div");
          productElement.classList.add("col-md-4", "col-12", "card", "mb-2");
          productElement.innerHTML = `
                <h2 class="card-title mt-4">${product.name}</h2>
                <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
                <p class="card-price  me-2 my-4">Price: $${product.price}
                <a
                  href="#"
                  class="btn btn-secondary "
                  onclick="inceaseValue()"
                  style="background-color: #929fba; width: 35px"
                  >+</a>
                  <a
                    href="#"
                    class="btn btn-secondary"
                    id="removeItem"
                    onclick="deceaseValue()"
                    style="background-color: #929fba; width: 35px"
                  >-</a>
                  </p>
                `;

          row.appendChild(productElement);
        }
      }
    }
  })
  .catch((error) => console.error("Error loading JSON:", error));

fetch("../bestSeller.json")
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
  .catch((error) => console.error("Error loading JSON:", error));
