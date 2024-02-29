const menuDrop = document.querySelector(".dropdown-menu");
const toggleMenu = () => menuDrop.classList.toggle("show");

window.onclick = (event) => {
  if (!event.target.matches(".icon-select")) {
    if (menuDrop.classList.contains("show")) {
      menuDrop.classList.remove("show");
    }
  }
};
