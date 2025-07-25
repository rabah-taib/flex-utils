import type { EnsurePrefix, Prefix } from "flex-types";

/**
 * Prefixes a string with another string.
 *
 * @param input - The string to prefix.
 * @param prefix - The string to prefix the input with.
 *
 * @returns The prefixed string.
 *
 * @example
 * ```ts
 * prefix("ice", "N") // "Nice"
 * ```
 */
export function prefix<Input extends Stringable, TPrefix extends Stringable>(
	input: Input,
	prefix: TPrefix,
): Prefix<Input, TPrefix> {
	return `${prefix}${input}`;
}

/**
 * Checks if a string is prefixed with another string.
 *
 * @param input - The string to check.
 * @param prefix - The string to check if it is prefixed with.
 *
 * @returns `true` if the string is prefixed with the other string, `false` otherwise.
 *
 * @example
 * ```ts
 * isPrefixed("Nice", "N") // true
 * isPrefixed("Nice", ":)") // false
 * ```
 */
export function isPrefixed(input: string, prefix: string): boolean {
	return input.startsWith(prefix);
}

/**
 * Ensures a string is prefixed with another string.
 *
 * @param input - The string to ensure is prefixed.
 * @param prefixToEnsure - The string to ensure the input is prefixed with.
 *
 * @returns The prefixed string.
 *
 * @example
 * ```ts
 * ensurePrefix("Ice", "N") // "Nice"
 * ensurePrefix("Nice", "N") // "Nice"
 * ```
 */
export function ensurePrefix<Input extends string, TPrefix extends string>(
	input: Input,
	prefixToEnsure: TPrefix,
): EnsurePrefix<Input, TPrefix> {
	return isPrefixed(input, prefixToEnsure) ? (input as Valid) : (prefix(input, prefixToEnsure) as Valid);
}
