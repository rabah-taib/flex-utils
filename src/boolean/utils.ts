import type { Negate } from "flex-types";

/**
 * Negates a boolean value.
 *
 * @param value - The value to negate.
 *
 * @returns The negated value.
 *
 * @example
 * ```ts
 * negate(true) // false
 * negate(false) // true
 * ```
 */

export function negate<T extends boolean>(value: T): Negate<T> {
	return !value as Valid;
}

/**
 * @cloneDoc negate
 */
/**
 * Negates a boolean value.
 *
 * @param value - The value to negate.
 *
 * @returns The negated value.
 *
 * @example
 * ```ts
 * negate(true) // false
 * negate(false) // true
 * ```
 */
export function not<T extends boolean>(value: T): Negate<T> {
	return negate(value);
}
