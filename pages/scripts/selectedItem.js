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
      
      let totalPriceElement = document.getElementById(`Totall_${product.id}`);
      let totalPrice = product.price * parseInt(newQuantity.textContent);
      totalPriceElement.textContent ="Totall:$ "+ totalPrice ;
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    } // mahsol jadid bara avalin bar
    else {
           
      let newQuantity = document.getElementById(`quantity_${product.id}`);
      newQuantity.textContent++;

      let totalPriceElement = document.getElementById(`Totall_${product.id}`);
      let totalPrice = product.price * parseInt(newQuantity.textContent);
      totalPriceElement.textContent ="Totall:$ "+ totalPrice ;
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
  updateTotalSelectedItems();
}
function deceaseValue(productId,productPrice) {
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
        let totalPriceElement = document.getElementById(`Totall_${productId}`);
        totalPriceElement.textContent ="Totall:$ "+0
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        document.getElementById(`removeItem_${productId}`).disabled = true;
      } else if (selectedItems[currentItemIndex].quantity > 1) {
        selectedItems[currentItemIndex].quantity--;

        let newQuantity = document.getElementById(`quantity_${productId}`);
        newQuantity.textContent--;
        let totalPriceElement = document.getElementById(`Totall_${productId}`);
        let totalPrice = productPrice * parseInt(newQuantity.textContent);
        totalPriceElement.textContent ="Totall:$ "+ totalPrice ;
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        console.log(newQuantity.textContent);
      }
    }
  } else {
    debugger;
    document.getElementById(`removeItem_${productId}`).style.display = true;
  }
  updateTotalSelectedItems();
}

function updateTotalSelectedItems() {
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  let totalQuantity = 0;
  selectedItems.forEach(item => {
    totalQuantity += item.quantity;
  });
  document.getElementById("valueSelectedItem").textContent = totalQuantity;
}

const selectedItemsMain = localStorage.getItem("selectedItems");

if (selectedItemsMain) {
  const selectedItems = JSON.parse(selectedItemsMain);

  for (i = 0; i < selectedItems.length; i++) {
    const product = selectedItems[i];

    let selectedItemsContainer = document.getElementById("selectedItem");
    let productElement = document.createElement("div");
    productElement.style="max-width: 26rem;"
    productElement.classList.add("col-md-4", "col-12", "card", "mb-2","me-2");
    productElement.id = `boxContainer_${product.id}`;

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
                         onclick="deceaseValue(${product.id},${product.price})"
                         style="background-color: #929fba; width: 35px;height:38px"
                       >-</button>
                     </div> 
                     <p class="card-price mt-1" id="Totall_${product.id}">Totall: $${product.price * product.quantity}</p>
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


// Call the function to show quantities for all products

window.addEventListener('load', function () {
  document.getElementById("valueSelectedItem").textContent =  getInitialItemsQuantity()
})
