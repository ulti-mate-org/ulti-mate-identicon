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

  console.log(`[DEBUG]: Generated pattern: ${JSON.stringify(pattern)}`);
  return pattern;
}

export { generatePattern };
