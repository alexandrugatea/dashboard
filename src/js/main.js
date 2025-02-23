// Import scss styles for webpack compiling into css
import '../styles/style.scss';

// Import html components
import sideBar from "../components/sidebar.html";
import statusBar from "../components/statusbar.html";
import main from "../components/main.html";

const app = document.getElementById('app');

const sidebarContainer = document.getElementById('sideBar');
sidebarContainer.innerHTML = sideBar;

const statusBarContainer = document.getElementById('statusBar');
statusBarContainer.innerHTML = statusBar;

const mainContainer = document.getElementById('main');
mainContainer.innerHTML = main;

sidebarContainer.addEventListener("click", toggleSideBar);

function toggleSideBar() {
    const sidebarStatus = sidebarContainer.getAttribute("aria-expanded") === "true";
    sidebarContainer.setAttribute("aria-expanded", !sidebarStatus);
    app.classList.toggle('collapsed');
}
