import type { SmartExtract } from "flex-types";

/**
 * Checks if a value is a function.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a function, `false` otherwise.
 *
 * @example
 * ```ts
 * // type guard
 * function main(value: string | (() => string)) {
 *   const processedValue = isFunction(value) ? value() : value;
 * }
 * ```
 */
export function isFunction<T>(value: T): value is SmartExtract<T, Func> {
	return typeof value === "function";
}
