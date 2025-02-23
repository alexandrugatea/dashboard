// Import scss styles for webpack compiling into css
import '../styles/style.scss';

// Import html components
import sideBar from "../components/sidebar.html";
import statusBar from "../components/statusbar.html";

const sidebarContainer = document.getElementById('sideBar');
sidebarContainer.innerHTML = sideBar;

const statusBarContainer = document.getElementById('statusBar');
statusBarContainer.innerHTML = statusBar;