import '../styles/style.scss'; // Webpack SCSS compilation

import { fetchConfig, fetchStatus } from './api.js';
import { processModList } from './modList.js';
import { populateScrollable, updateStatusUI } from './updateUI.js';
import { setupTabs } from './tabs.js';
import { setupSidebar } from './sidebar.js';
import { updateStatusBar } from './statusbar.js';

// Import HTML components
import sideBar from '../components/sidebar.html';
import statusBar from '../components/statusbar.html';
import main from '../components/main.html';

document.addEventListener('DOMContentLoaded', async () => {
	const app = document.getElementById('app');
	const sidebarContainer = document.getElementById('sideBar');
	const statusBarContainer = document.getElementById('statusBar');
	const mainContainer = document.getElementById('main');

	if (!app || !sidebarContainer || !statusBarContainer || !mainContainer) {
		console.error('One or more elements are missing from the DOM.');
		return;
	}

	// Load components into DOM
	sidebarContainer.innerHTML = sideBar;
	statusBarContainer.innerHTML = statusBar;
	mainContainer.innerHTML = main;

	await new Promise((resolve) => setTimeout(resolve, 0));

	setupSidebar(sidebarContainer);

	const configData = await fetchConfig();
	if (configData) {
		populateScrollable(processModList(configData));
	}

	const statusData = await fetchStatus();
	if (statusData) {
		updateStatusUI(statusData);
		updateStatusBar(statusData);
	}

	document.querySelectorAll('[data-tab-container]').forEach(setupTabs);
});
