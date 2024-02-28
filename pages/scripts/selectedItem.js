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
      let newQuantity = document.getElementById(`quantity_${product.id}`);
      newQuantity.textContent++;
      // selectedItems[currentItemIndex].Number(newQuantity)++

      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    } // mahsol jadid bara avalin bar
    else {
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

  let span = document.getElementById("valueSelectedItem");
  let currentValue = parseInt(span.textContent);
  span.textContent = currentValue + 1;
}
function deceaseValue(productId) {
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
        newQuantity.textContent=0
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        document.getElementById(`removeItem_${productId}`).disabled = true;
        
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;

        let newQuantity = document.getElementById(`quantity_${productId}`);
        newQuantity.textContent--;
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        console.log(newQuantity.textContent)
      }
    }
  } else {
    debugger
    document.getElementById(`removeItem_${productId}`).style.display = true;
    
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

const selectedItemsMain = localStorage.getItem("selectedItems");

if (selectedItemsMain) {
  const selectedItems = JSON.parse(selectedItemsMain);

  for (i = 0; i < selectedItems.length; i++) {
    const product = selectedItems[i];

    let selectedItemsContainer = document.getElementById("selectedItem");
    let productElement = document.createElement("div");
    productElement.classList.add("col-lg-4", "col-12", "card", "mb-2");

    // console.log(JSON.stringify(product))
    // console.log(JSON.stringify(product).replace(/"/g, "&quot;"))
    productElement.innerHTML = `
                      <div class ="d-flex justify-content-center "><h2 class="card-title mt-4 me-3">${product.name}</h2>
                      </div>
                      <img class= "mx-auto  d-block card-image-top rounded mt-2" src="${product.image}" alt="${product.name}">
                     <div class= "d-flex justify-content-center my-3">
                     <p class="card-price  me-2 mt-1">Price: $${product.price}</p>
                     <button
                       class="btn btn-secondary me-2 " 
                       onclick="increaseValue(${JSON.stringify(product).replace(/"/g, "&quot;")})"
                       style="background-color: #929fba; width: 35px ; height:38px"
                       >+</button>
                       <h3 id="quantity_${product.id}">${product.quantity}</h3>
                       <button
                         class="btn btn-secondary ms-2"
                         id="removeItem_${product.id}"
                         onclick="deceaseValue(${product.id})"
                         style="background-color: #929fba; width: 35px;height:38px"
                       >-</button>
                     </div> 
                     <p class="card-price mt-1">Totall: $${product.price * product.quantity}</p>
                      `;

    selectedItemsContainer.appendChild(productElement);
 
  }
}
// Retrieve the value from localStorage when the other page loads

let span = document.getElementById("valueSelectedItem");
let storedValue = localStorage.getItem("valueSelectedItem");
let storedValueCategory = localStorage.getItem("valueSelectedItemCategory");
if (storedValue) {
  span.textContent = Number(storedValue) + Number(storedValueCategory);
}
