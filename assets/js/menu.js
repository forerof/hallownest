document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const headerLinks = document.querySelector(".header-links");

    hamburgerMenu.addEventListener("click", () => {
        headerLinks.classList.toggle("open");
    });
});