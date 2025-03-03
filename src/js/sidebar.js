export function setupSidebar(sidebarContainer) {
	const sideBarToggler = sidebarContainer.querySelector('#sidebarToggler');

	if (!sideBarToggler) {
		console.error('Sidebar toggler button not found inside sidebar.html');
		return;
	}

	sideBarToggler.addEventListener('click', function () {
		const sidebarStatus = sidebarContainer.getAttribute('aria-expanded') === 'true';
		sidebarContainer.setAttribute('aria-expanded', !sidebarStatus);
		document.getElementById('app').classList.toggle('collapsed');
		sideBarToggler.classList.toggle('collapsed');
	});
}
