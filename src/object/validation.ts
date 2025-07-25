import type { SmartExtract } from "flex-types";

/**
 * Checks if a value is an object.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is an object, `false` otherwise.
 *
 * @example
 * ```ts
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * ```
 */
export function isObject<T>(value: T): value is SmartExtract<T, Dict> {
	return typeof value === "object" && value !== null && value.constructor.name === "Object";
}

/**
 * Checks if an object has a key.
 *
 * @param obj - The object to check.
 * @param key - The key to check.
 *
 * @returns `true` if the object has the key, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * const obj = { a: 1, b: 2 };
 * objHas(obj, "a") // true
 * objHas(obj, "c") // false
 *
 * // Type guard
 * const obj2 = { a: 1 } | { b: 2 };
 * if (objHas(obj2, "a")) {
 *   // obj2 is now narrowed to { a: 1 }
 * }
 * ```
 */
export function objHas<T extends Dict, K extends Keys<T>>(obj: T, key: K): obj is Extract<T, Dict<K>> {
	return key in obj;
}
