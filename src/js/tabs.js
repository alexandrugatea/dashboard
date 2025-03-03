export function setupTabs(container) {
	if (!container) return;

	const tabs = container.querySelectorAll('[data-tab-target]');

	tabs.forEach((tab) => {
		tab.addEventListener('click', function () {
			const tabTarget = this.dataset.tabTarget;
			const section = this.closest('[data-tab-container]');
			const targetTab = document.querySelector(`[data-tab-source="${tabTarget}"]`);

			if (!targetTab) {
				console.error('No tab found for:', tabTarget);
				return;
			}

			// Hide other tabs in the same section
			section.querySelectorAll('[data-tab-target]').forEach((content) => {
				document.querySelector(`[data-tab-source="${content.dataset.tabTarget}"]`).style.display = 'none';
			});

			// Remove active class from all tabs in the section
			tabs.forEach((t) => t.classList.remove('active'));

			// Activate clicked tab
			this.classList.add('active');
			targetTab.style.display = 'grid';
		});
	});

	// Auto-select first tab
	if (tabs.length > 0) {
		tabs[0].click();
	}
}
