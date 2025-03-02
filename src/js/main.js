import '../styles/style.scss'; // Import SCSS styles for Webpack compiling into CSS

// Import HTML components
import sideBar from "../components/sidebar.html";
import statusBar from "../components/statusbar.html";
import main from "../components/main.html";


document.addEventListener("DOMContentLoaded", async () => {

    const app = document.getElementById('app');
    const sidebarContainer = document.getElementById('sideBar');
    const statusBarContainer = document.getElementById('statusBar');
    const mainContainer = document.getElementById('main');

    if (!app || !sidebarContainer || !statusBarContainer || !mainContainer) {
        console.error("One or more elements are missing from the DOM.");
        return;
    }

    // Load components into DOM
    sidebarContainer.innerHTML = sideBar;
    statusBarContainer.innerHTML = statusBar;
    mainContainer.innerHTML = main;

    const sideBarToggler = sidebarContainer.querySelector("#sidebarToggler");

    if (!sideBarToggler) {
        console.error("Sidebar toggler button not found inside sidebar.html");
        return;
    }

    sideBarToggler.addEventListener("click", toggleSideBar);
    
    function toggleSideBar() {
        const sidebarStatus = sidebarContainer.getAttribute("aria-expanded") === "true";
        sidebarContainer.setAttribute("aria-expanded", !sidebarStatus);
        app.classList.toggle('collapsed');
        sideBarToggler.classList.toggle('collapsed');
    }

    const tabs = document.querySelectorAll(".sidebar-links li");
    const tabContents = document.querySelectorAll("[id^='tab-']");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const targetTab = document.getElementById(`tab-${this.dataset.tab}`);

            // Remove 'active' class from all tabs and hide all contents
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.style.display = "none");

            // Add 'active' class to clicked tab and show corresponding content
            this.classList.add("active");
            if (targetTab) targetTab.style.display = "block";
        });
    });

    // Set default active tab (first one)
    if (tabs.length > 0) {
        tabs[0].click();
    }
});



