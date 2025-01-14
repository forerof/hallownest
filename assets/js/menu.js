document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const headerLinks = document.querySelector(".header-links");

    hamburgerMenu.addEventListener("click", () => {
        headerLinks.classList.toggle("open"); // Alterna el menú
        hamburgerMenu.classList.toggle("open"); // Cambia el estado del ícono
        if (headerLinks.classList.contains("open")) {
            hamburgerMenu.innerHTML = "&times;"; // Ícono de "X"
            hamburgerMenu.setAttribute("aria-label", "Cerrar menú");
        } else {
            hamburgerMenu.innerHTML = "&#9776;"; // Ícono de hamburguesa
            hamburgerMenu.setAttribute("aria-label", "Abrir menú");
        }
    });
});