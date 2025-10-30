/**
 * Generates an SVG string representing a grid pattern.
 *
 * @param {number} size - The total size of the SVG in pixels.
 * @param {number} cellSize - The size of each cell in the grid.
 * @param {number} grid - The number of cells in each row and column.
 * @param {Array<Array<number>>} pattern - A 2D array representing the grid pattern.
 * @param {string} color - The color to use for filled cells.
 * @returns {string} - The generated SVG string.
 */
function generateSvg(size, cellSize, grid, pattern, color) {
	// We build the SVG content as a string following the SVG XML format.
	// ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes
	let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

	// TODO: minimize SVG output
	// TODO: modify this to support more states than just filled/empty
	for (let row = 0; row < grid; row++) {
		for (let col = 0; col < grid; col++) {
			if (pattern[row][col] === 1) {
				// Filled cell
				const x = col * cellSize;
				const y = row * cellSize;
				svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
			}
		}
	}
	svgContent += `</svg>`;

	return svgContent;
}

export { generateSvg };
