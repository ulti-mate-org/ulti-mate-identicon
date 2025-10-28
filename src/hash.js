import fnv1a from '@sindresorhus/fnv1a';

/*
 * Generates a 128-bit hash from the given seed using the FNV-1a algorithm.
 *
 * @param {string} seed - The seed string to hash.
 * @returns {string} - The generated 128-bit hash as a hexadecimal string.
 */
function generateHash(seed) {
  console.log(`[DEBUG]: Generating hash for seed: ${seed}`);

  // we generate a 128-bit hash using the fnv1a algorithm,
  // since fnv1a returns a BigInt, we convert it to a hex string
  // and pad the result to ensure it's 32 characters long (128 bits in hex)
  // ref: https://github.com/sindresorhus/fnv1a
  var hash = fnv1a(seed, { size: 128 }).toString(16).padStart(32, '0');
  console.log(`[DEBUG]: Generated hash: ${hash}`);

  return hash;
}

export { generateHash };
