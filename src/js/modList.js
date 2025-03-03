export function processModList(modList) {
	return {
		packII: modList.filter((mod) => mod.name.startsWith('bait.two_')),
		bait: modList.filter((mod) => mod.name.startsWith('bait.') && !mod.name.includes('two_')),
	};
}
