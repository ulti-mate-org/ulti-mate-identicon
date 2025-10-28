import fnv1a from '@sindresorhus/fnv1a';

const DEFAULT_GRID = 5;

const DEFAULT_CELL_SIZE = 5;

/*
 * Generates a 128-bit hash from the given seed using the FNV-1a algorithm.
 *
 * @param {string} seed - The seed string to hash.
 * @returns {string} - The generated 128-bit hash as a hexadecimal string.
 */
function generateHash(seed) {
  // we generate a 128-bit hash using the fnv1a algorithm,
  // since fnv1a returns a BigInt, we convert it to a hex string
  // and pad the result to ensure it's 32 characters long (128 bits in hex)
  // ref: https://github.com/sindresorhus/fnv1a
  var hash = fnv1a(seed, { size: 128 }).toString(16).padStart(32, '0');

  return hash;
}

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
  // For simplicity, let's say even values are filled cells, odd are empty.
  // TODO: implement a realistic pattern generation algorithm.
  for (let row = 0; row < grid; row++) {
    const rowPattern = [];
    for (let col = 0; col < grid; col++) {
      const index = (row * grid + col) % hashLength;
      const cellValue = parseInt(hash[index], 16); // Convert hex char to integer
      // TODO: use %3 or more to have more states (e.g., empty, filled but lighter, darker...)
      rowPattern.push(cellValue % 2 === 0 ? 1 : 0);
    }
    pattern.push(rowPattern);
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
