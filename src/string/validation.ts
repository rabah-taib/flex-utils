/**
 * Checks if `value` is a string.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a string, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isString("hello") // true
 * isString(123) // false
 *
 * // Type guard
 * const value = getValue(); // `value` is `unknown`
 * if (isString(value)) {
 *   // `value` is now `string`
 * }
 * ```
 */
export function isString<T>(value: T): value is Extract<T, string> {
	return typeof value === "string";
}

/**
 * Checks if `value` is an empty string (`""`).
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is an empty string, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isEmptyString("") // true
 * isEmptyString("hello") // false
 *
 * // Type guard
 * const input = getInput(); // `string`
 * if (isEmptyString(input)) {
 *   // `input` is now `""`
 * }
 * ```
 */
export function isEmptyString<T>(value: T): value is Extract<T, ""> {
	return value === "";
}

/**
 * Checks if `value` is a non-empty string of whitespaces.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a non-empty string of whitespaces, `false` otherwise.
 *
 * @example
 * ```ts
 * isWhitespaces("  ") // true
 * isWhitespaces("") // false
 * isWhitespaces("hola") // false
 * ```
 */
export function isWhitespaces(value: string): boolean {
	return value.length > 0 && value.trim() === "";
}

/**
 * Checks if `value` is a string of whitespaces.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a string of whitespaces, `false` otherwise.
 *
 * @example
 * ```ts
 * isEmptyOrWhitespaces("  ") // true
 * isEmptyOrWhitespaces("") // true
 * isEmptyOrWhitespaces("hola") // false
 * ```
 */
export function isEmptyOrWhitespaces(value: string): boolean {
	return value.trim() === "";
}
