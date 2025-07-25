/**
 * Converts an index to a number (index + 1).
 *
 * @param index - The index to convert.
 *
 * @returns The number.
 *
 * @example
 * ```ts
 * indexToNumber(0) // 1
 * indexToNumber(1) // 2
 * ```
 */
export function indexToNumber(index: number): number {
	return index + 1;
}

/**
 * Converts a number to an index (number - 1).
 *
 * @param number - The number to convert.
 *
 * @returns The index.
 *
 * @example
 * ```ts
 * numberToIndex(1) // 0
 * numberToIndex(2) // 1
 * ```
 */
export function numberToIndex(number: number): number {
	return number - 1;
}
