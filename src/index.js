// ulti-mate-identicon — v1.1.0 — unique avatar generator
//
// This project is part of the ulti-mate organization suite,
// see: https://ulti-mate.org
//
// license: MIT
// author: Emiliano Rizzonelli (emiliano.rizzonelli@proton.me)

import { DEFAULT_GRID, DEFAULT_CELL_SIZE } from './constants.js';
import { generateHash } from './hash.js';
import { generatePattern } from './pattern.js';
import { generateSvg } from './svg.js';

/*
 * Generates a unique identicon based on the provided seed.
 *
 * @param {string} seed - The seed string to generate the identicon.
 * @param {number} grid - The grid size  (nxn).
 * @param {number} size - The size of the identicon in pixels.
 * @returns {string} - The SVG representing the generated identicon image.
 */
function generateIdenticon(seed, grid = DEFAULT_GRID, size = DEFAULT_CELL_SIZE) {
  console.log(`[DEBUG]: Generating identicon with seed: ${seed}, grid: ${grid}, size: ${size}`);

  const hash = generateHash(seed);

  const pattern = generatePattern(hash, grid);

  const color = `#${hash.slice(0, 6)}`; // Use first 6 chars of hash for color

  const cellSize = size / grid;

  const svg = generateSvg(size, cellSize, grid, pattern, color);

  console.log(`[DEBUG]: Generated SVG content: ${svg}`);

  return svg;
}

export { generateIdenticon };
