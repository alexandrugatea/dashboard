export function updateStatusBar(statusData) {
	const servicesList = document.getElementById('servicesList');

	if (!servicesList) {
		console.error('Services list not found inside #statusBar.');
		return;
	}

	// Clear existing content
	servicesList.innerHTML = '';

	let hasInactiveService = false; // Track if any service is inactive

	// Function to create each subscription item
	function createSubscriptionItem(serviceName, datePaid, isPaid) {
		const li = document.createElement('li');
		li.innerHTML = `
            <span class="service">${serviceName}</span>
            <span class="status ${isPaid ? 'valid' : 'invalid'}">
                ${isPaid ? datePaid : 'Inactive'}
            </span>
        `;

		if (!isPaid) hasInactiveService = true; // Flag at least one inactive service
		return li;
	}

	// Add subscription items
	servicesList.appendChild(createSubscriptionItem('Ogre:', statusData.ogre_date, statusData.ogre_paid));
	servicesList.appendChild(createSubscriptionItem('Bait:', statusData.bait_date, statusData.bait_paid));
	servicesList.appendChild(createSubscriptionItem('Pack II:', statusData.pack2_date, statusData.pack2_paid));

	// Show "Get a Code" button only if at least one service is inactive
	if (hasInactiveService) {
		const purchaseItem = document.createElement('li');
		purchaseItem.innerHTML = `<a href="!#" class="button purchase">Get a code</a>`;
		servicesList.appendChild(purchaseItem);
	}
}
