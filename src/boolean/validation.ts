import type { SmartExtract } from "flex-types";

/**
 * Checks if a value is a boolean.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a boolean, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean("anything-else") // false
 *
 * // Type guard
 * const value = getValue(); // `value` is `unknown`
 * if (isBoolean(value)) {
 *   // `value` is now `boolean`
 * }
 * ```
 */

export function isBoolean<T>(value: T): value is SmartExtract<T, boolean> {
	return typeof value === "boolean";
}

/**
 * Checks if a value is `true`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isTrue(true) // true
 * isTrue("anything-else") // false
 *
 * // Real-world usage
 * function main(options: Dict) {
 *   if (isTrue(options.feature)) {
 *     // Do something
 *   }
 * }
 * ```
 */

export function isTrue<T>(value: T): value is SmartExtract<T, true> {
	return value === true;
}

/**
 * Checks if a value is `false`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isFalse(false) // true
 * isFalse("anything-else") // false
 *
 * // Real-world usage
 * function main(options: Dict) {
 *   if (isFalse(options.feature)) {
 *     // Do something
 *   }
 * }
 * ```
 */

export function isFalse<T>(value: T): value is SmartExtract<T, false> {
	return value === false;
}

/**
 * Checks if a value is not `true`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is not `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isNotTrue(true) // false
 * isNotTrue("anything-else") // true
 * ```
 */

export function isNotTrue<T>(value: T): value is Exclude<T, true> {
	return value !== true;
}

/**
 * Checks if a value is not `false`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is not `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isNotFalse(false) // false
 * isNotFalse("anything-else") // true
 * ```
 */

export function isNotFalse<T>(value: T): value is Exclude<T, false> {
	return value !== false;
}
