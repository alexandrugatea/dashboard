const endPoint = 'http://localhost:31339';

export async function fetchConfig() {
	try {
		const response = await fetch(`${endPoint}/config`);
		if (!response.ok) throw new Error('Failed to fetch config');
		return await response.json();
	} catch (error) {
		console.error('Error fetching config:', error);
		return null;
	}
}

export async function fetchStatus() {
	try {
		const response = await fetch(`${endPoint}/status`);
		if (!response.ok) throw new Error('Failed to fetch status');
		return await response.json();
	} catch (error) {
		console.error('Error fetching status:', error);
		return null;
	}
}
