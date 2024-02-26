function inceaseValue(producId) {
    console.log(producId);
    localStorage.setItem("product id ", producId);
    let productStorage = json.parseInt(localStorage.getItem(producId));
  
    let span = document.getElementById("valueSelectedItem");
    let currentValue = parseInt(span.textContent);
    span.textContent = currentValue + 1;
  }
  function deceaseValue(producId) {
    console.log(producId);
    localStorage.removeItem(producId);
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

  