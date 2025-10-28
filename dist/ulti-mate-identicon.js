// ulti-mate-identicon — v1.0.0 — unique avatar generator
//
// This project is part of the ulti-mate organization suite,
// see: https://ulti-mate.org
//
// license: MIT
// author: Emiliano Rizzonelli (emiliano.rizzonelli@proton.me)

import fnv1a from '@sindresorhus/fnv1a';

const DEFAULT_GRID = 5;
const DEFAULT_CELL_SIZE = 5;

export function generateIdenticon(seed, grid = DEFAULT_GRID, size = DEFAULT_CELL_SIZE) {
  const hash = generateHash(seed);
  const pattern = generatePattern(hash, grid);
  const color = `#${hash.slice(0, 6)}`;
  const cellSize = size / grid;
  const svg = generateSvg(size, cellSize, grid, pattern, color);
  return svg;
}

function generateHash(seed) {
  var hash = fnv1a(seed, { size: 128 }).toString(16).padStart(32, '0');
  return hash;
}

function generatePattern(hash, grid) {
  const pattern = [];
  const hashLength = hash.length;
  for (let row = 0; row < grid; row++) {
    const rowPattern = [];
    for (let col = 0; col < grid; col++) {
      const index = (row * grid + col) % hashLength;
      const cellValue = parseInt(hash[index], 16);
      rowPattern.push(cellValue % 2 === 0 ? 1 : 0);
    }
    pattern.push(rowPattern);
  }
  return pattern;
}

function generateSvg(size, cellSize, grid, pattern, color) {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      if (pattern[row][col] === 1) {
        const x = col * cellSize;
        const y = row * cellSize;
        svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
      }
    }
  }
  svgContent += `</svg>`;
  return svgContent;
}
