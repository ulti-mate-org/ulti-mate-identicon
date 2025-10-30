const DEFAULT_GRID = 5;

const DEFAULT_CELL_SIZE = 5;

/*
 * Generates a unique identicon based on the provided seed.
 *
 * @param {string} seed - The seed string to generate the identicon.
 * @param {number} grid - The grid size  (nxn).
 * @param {number} size - The size of the identicon in pixels.
 * @returns {string} - The SVG representing the generated identicon image.
 */
function generateIdenticon(seed, grid = DEFAULT_GRID, size = DEFAULT_CELL_SIZE) {
  const hash = generateHash(seed);

  const pattern = generatePattern(hash, grid);

  const color = `#${hash.slice(0, 6)}`; // Use first 6 chars of hash for color

  const cellSize = size / grid;

  const svg = generateSvg(size, cellSize, grid, pattern, color);

  return svg;
}

/*
 * Generates a custom non-cryptographic hash.
 *
 * @param {string} seed - The input string.
 * @param {number} size - Output size in bytes (e.g., 16 for 128-bit).
 * @returns {string} - Hexadecimal hash string.
 */
function generateHash(seed, size = 16) {
	if (typeof seed !== 'string') seed = String(seed);
	if (size <= 0) throw new Error('Size must be > 0');

	let state = BigInt(0xcbf29ce484222325n); // offset basis
	const prime = 0x100000001b3n; // large odd prime
	const mask = (1n << BigInt(size * 8)) - 1n; // bitmask for desired length

	for (let i = 0; i < seed.length; i++) {
		const c = BigInt(seed.charCodeAt(i));
		// mix with bit shifts, XOR, and modular multiplication
		state ^= c + BigInt(i * 31);
		state = (state * prime) & mask;
		state ^= (state >> 13n) ^ (state << 7n);
		state &= mask;
	}

	// final avalanche mixing
	for (let i = 0; i < 4; i++) {
		state ^= (state >> 11n) ^ (state << 5n);
		state = (state * prime) & mask;
	}

	const hex = state.toString(16).padStart(size * 2, '0');
	return hex;
}

/*
 * Generates a unique pattern based on the provided hash and size.
 *
 * @param {string} hash - The hash string to generate the pattern.
 * @param {number} grid - The size of the grid.
 */
function generatePattern(hash, grid) {
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

	return pattern;
}


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

export { generateIdenticon };
