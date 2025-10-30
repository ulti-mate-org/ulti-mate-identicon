/*
 * Generates a unique pattern based on the provided hash and size.
 *
 * @param {string} hash - The hash string to generate the pattern.
 * @param {number} grid - The size of the grid.
 */
function generatePattern(hash, grid) {
	console.log(`[DEBUG]: Generating pattern with hash: ${hash}, grid size: ${grid}`);
	
	const pattern = [];
	const hashLength = hash.length;

	
	// We want the index in the hash string, then we use the character
	// at the calculated index to determine cell state.
	// We only do that for the first half and then mirror it for symmetry.
	// For simplicity, let's say even values are filled cells, odd are empty.
	// TODO: implement a realistic pattern generation algorithm.
	for (let row = 0; row < grid; row++) {
		const rowPattern = [];
		// generate left half
		for (let col = 0; col < Math.ceil(grid / 2); col++) {
			const index = (row * Math.ceil(grid / 2) + col) % hashLength;
			const cellValue = parseInt(hash[index], 16);  // Convert hex char to integer
			// TODO: use %3 or more to have more states (e.g., empty, filled but lighter, darker...)
			rowPattern.push(cellValue % 2 === 0 ? 1 : 0);
		}
		// mirror left → right
		const mirroredPart = rowPattern
			.slice(0, grid % 2 === 0 ? rowPattern.length : rowPattern.length - 1)
			.reverse();

		pattern.push(rowPattern.concat(mirroredPart));
	}

	console.log(`[DEBUG]: Generated pattern: ${JSON.stringify(pattern)}`);
	return pattern;
}


export { generatePattern };
