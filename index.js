const header = document.querySelector("header");
const menuButton = document.querySelector(".hamburger-icon");
const navLink = document.querySelector(".nav-links");
const navIcon = document.getElementById("nav-icon");
const navLinkItems = document.querySelectorAll(".nav-links-item");

let showMenu = false;

function closeNav() {
  setTimeout(() => {
    showMenu = false;
    navLink.classList.remove("show-nav-links");
    changeIcon();
  }, 200);
}

function headerColor() {
  window.scrollY >= 10 || showMenu
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
}

function changeIcon() {
  showMenu
    ? navIcon.setAttribute("src", "assets/x.svg")
    : navIcon.setAttribute("src", "assets/hamburger.svg");
}

function toggleMenu() {
  menuButton.addEventListener("click", () => {
    navLink.classList.toggle("show-nav-links");
    showMenu = !showMenu;
    headerColor();
    changeIcon();
  });
}

toggleMenu();
window.addEventListener("scroll", headerColor);
navLink.addEventListener("click", closeNav);

// Experience Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const experiencePanels = document.querySelectorAll('.experience-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and panels
    tabBtns.forEach(b => b.classList.remove('active'));
    experiencePanels.forEach(p => p.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Show corresponding panel
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
