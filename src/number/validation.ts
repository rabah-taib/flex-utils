import type { SmartExtract } from "flex-types";

/**
 * Checks if `value` is a number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a number, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isNumber(123) // true
 * isNumber("hello") // false
 *
 * // Type guard
 * const value = getValue(); // `value` is `unknown`
 * if (isNumber(value)) {
 *   // `value` is now `number`
 * }
 * ```
 */

export function isNumber<T>(value: T): value is SmartExtract<T, number> {
	return typeof value === "number";
}

/**
 * Checks if `value` is a positive number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a positive number, `false` otherwise.
 *
 * @example
 * ```ts
 * isPositive(-123) // false
 * isPositive(0) // false
 * isPositive(123) // true
 * ```
 */

export function isPositive(value: number): boolean {
	return value > 0;
}

/**
 * Checks if `value` is a negative number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a negative number, `false` otherwise.
 *
 * @example
 * ```ts
 * isNegative(-123) // true
 * isNegative(0) // false
 * isPositive(123) // false
 * ```
 */

export function isNegative(value: number): boolean {
	return value < 0;
}

/**
 * Checks if `value` is zero.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is zero, `false` otherwise.
 *
 * @example
 * ```ts
 * isZero(-123) // false
 * isZero(0) // true
 * isZero(123) // false
 * ```
 */

export function isZero(value: number): boolean {
	return value === 0;
}

/**
 * Checks if `value` is a non-negative number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a non-negative number, `false` otherwise.
 *
 * @example
 * ```ts
 * isNonNegative(-123) // false
 * isNonNegative(0) // true
 * isNonNegative(123) // true
 * ```
 */

export function isNonNegative(value: number): boolean {
	return value >= 0;
}

/**
 * Checks if `value` is a non-positive number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a non-positive number, `false` otherwise.
 *
 * @example
 * ```ts
 * isNonPositive(-123) // true
 * isNonPositive(0) // true
 * isNonPositive(123) // false
 * ```
 */

export function isNonPositive(value: number): boolean {
	return value <= 0;
}

/**
 * Checks if `value` is an integer.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is an integer, `false` otherwise.
 *
 * @example
 * ```ts
 * isInteger(123) // true
 * isInteger(123.5) // false
 * ```
 */

export function isInteger(value: number): boolean {
	return Number.isInteger(value);
}

/**
 * Checks if `value` is a float.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a float, `false` otherwise.
 *
 * @example
 * ```ts
 * isFloat(123) // false
 * isFloat(123.5) // true
 * ```
 */

export function isFloat(value: number): boolean {
	return !Number.isInteger(value);
}

/**
 * Checks if all indexes are non-negative (`index >= 0`).
 *
 * @param index - The indexes to check.
 *
 * @returns `true` if all indexes are non-negative, `false` otherwise.
 *
 * @example
 * ```ts
 * isDefinedIndex(0) // true
 * isDefinedIndex(-1) // false
 * ```
 */
export function isDefinedIndex(index: number): boolean {
	return isNonNegative(index);
}
