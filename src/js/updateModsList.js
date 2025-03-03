export function populateModsList(modGroups, statusData) {
	const scrollable = document.querySelector('.mods-sidebar .scrollable');
	if (!scrollable) {
		console.error('Scrollable container not found.');
		return;
	}

	// Clear existing content before appending
	scrollable.innerHTML = '';

	function createModGroup(title, className, mods) {
		const container = document.createElement('div');
		container.className = `mods-group ${className}`;
		container.innerHTML = `
            <h3 class="mods-group-title">${title} <span class="status"></span></h3>
            <ul></ul>
        `;

		const list = container.querySelector('ul');

		mods.forEach((mod) => {
			const listItem = document.createElement('li');
			listItem.className = 'toggle-option';

			// Strip prefixes "b4it -" or "b4it :"
			const displayName = mod.template.modDisplayName
				? mod.template.modDisplayName.replace(/^[^-:]+ [-:] /, '')
				: mod.name;

			listItem.innerHTML = `
                <input type="checkbox" id="${mod.name}" ${mod.values.enabled ? 'checked' : ''}>
                <label for="${mod.name}">
                    <span class="option-state"><span>On</span><span>Off</span></span>
                </label>
                <button data-tab-target="${mod.name}">${displayName}</button>
            `;

			list.appendChild(listItem);
		});

		return container;
	}

	// Determine if Pack II should be inactive
	const packIIClass = statusData.pack2_paid ? '' : 'inactive';

	// Append mod groups with the correct class
	if (modGroups.packII.length) {
		scrollable.appendChild(createModGroup('Pack II settings', packIIClass, modGroups.packII));
	}

	if (modGroups.bait.length) {
		scrollable.appendChild(createModGroup('Bait settings', '', modGroups.bait));
	}
}

export function updateStatusUI(statusData) {
	document.querySelectorAll('.mods-group-title').forEach((title) => {
		const statusElement = title.querySelector('.status');

		if (!statusElement) return;

		if (title.innerText.includes('Pack II')) {
			statusElement.innerHTML = statusData.pack2_paid
				? `<span class="status valid">${statusData.pack2_date}</span>`
				: `<span class="status invalid">Inactive <a href="!#" class="button purchase small">Get a code</a></span>`;
		}

		if (title.innerText.includes('Bait')) {
			statusElement.innerHTML = statusData.bait_paid
				? `<span class="status valid">${statusData.bait_date}</span>`
				: `<span class="status invalid">Inactive <a href="!#" class="button purchase small">Get a code</a></span>`;
		}
	});
}
