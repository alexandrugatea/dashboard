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

    await new Promise(resolve => setTimeout(resolve, 0)); 

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

    function setupTabs(container) {
        if (!container) return;

        const tabs = container.querySelectorAll("[data-tab-target]");
        console.log(tabs);

        tabs.forEach(tab => {
            tab.addEventListener("click", function (e) {
                const tabTarget = this.dataset.tabTarget; // Get target name
                const section = this.closest("[data-tab-container]");
                const targetTab = document.querySelector(`[data-tab-source="${tabTarget}"]`);

                if (!targetTab) {
                    console.error("No tab found for:", tabTarget);
                    return;
                }
                // Hide all other tabs inside this section
                section.querySelectorAll("[data-tab-target]").forEach(content => {
                    // content.style.display = "none";
                    document.querySelector(`[data-tab-source="${content.dataset.tabTarget}"]`).style.display = "none";
                });

                // Remove active state from all tabs inside this container
                tabs.forEach(t => t.classList.remove("active"));

                // Show the selected tab and mark it as active
                this.classList.add("active");
                targetTab.style.display = "grid"; // Ensure it's displayed correctly
            });
        });

        // Auto-select first tab in this container
        if (tabs.length > 0) {
            tabs[0].click();
        }
    }

    // 🔥 Initialize tabs only after HTML is dynamically inserted
    document.querySelectorAll("[data-tab-container]").forEach(setupTabs);
});



