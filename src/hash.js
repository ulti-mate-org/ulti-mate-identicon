/*
 * Generates a custom non-cryptographic hash.
 *
 * @param {string} seed - The input string.
 * @param {number} size - Output size in bytes (e.g., 16 for 128-bit).
 * @returns {string} - Hexadecimal hash string.
 */
function generateHash(seed, size = 16) {
	console.log('generateHash called with seed:', seed, 'and size:', size);
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
	console.log('Generated hash:', hex);
	return hex;
}

export { generateHash };
