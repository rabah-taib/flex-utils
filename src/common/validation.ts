import type { SmartExtract } from "flex-types";
import { isFalse, isNotFalse, isNotTrue, isTrue, not } from "../boolean";

/**
 * Checks if a value is defined (not `null` nor `undefined`).
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is defined, `false` otherwise.
 *
 * @example
 * ```ts
 * function main(action?: string) {
 *   if (isDefined(action)) {
 *     // ...
 *   }
 * }
 * ```
 */

export function isDefined<T>(value: T): value is Exclude<T, Nullish> {
	return not(isOneOf(value, [null, undefined]));
}

/**
 * Checks if a value is `null`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null`, `false` otherwise.
 *
 * @example
 * ```ts
 * isNull(null) // true
 * isNull("anything-else") // false
 * ```
 */
export function isNull<T>(value: T): value is SmartExtract<T, null> {
	return value === null;
}

/**
 * Checks if a value is `undefined`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `undefined`, `false` otherwise.
 *
 * @example
 * ```ts
 * isUndefined(undefined) // true
 * isUndefined("anything-else") // false
 * ```
 */
export function isUndefined<T>(value: T): value is SmartExtract<T, undefined> {
	return value === undefined;
}

/**
 * Checks if a value is `null` or `undefined`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null` or `undefined`, `false` otherwise.
 *
 * @example
 * ```ts
 * isNullish(null) // true
 * isNullish(undefined) // true
 * isNullish("anything-else") // false
 * ```
 */
export function isNullish<T>(value: T): value is SmartExtract<T, Nullish> {
	return oneOf(isNull(value), isUndefined(value));
}

/**
 * Checks if a value is one of the given values.
 *
 * @param value - The value to check.
 * @param values - The values to check against.
 *
 * @returns `true` if the value is one of the given values, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * isOneOf("apple", ["apple", "banana", "cherry"]) // true
 * isOneOf("orange", ["apple", "banana", "cherry"]) // false
 *
 * // Type guard
 * function main(action: string) {
 *   if (isOneOf(action, ["apple", "banana", "cherry"] as const)) {
 *     // `action` is now narrowed to "apple" | "banana" | "cherry"
 *   }
 * }
 * ```
 */
export function isOneOf<T, U extends List>(value: T, values: U): value is SmartExtract<T, U[number]> {
	return values.includes(value);
}

/**
 * Checks if at least one of the given conditions is truthy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if at least one of the conditions is truthy, `false` otherwise.
 *
 * @example
 * ```ts
 * const value = null;
 * oneOf(isNull(value), isUndefined(value)) // true
 * ```
 */
export function oneOf(...conditions: List) {
	return conditions.some(Boolean);
}

/**
 * @cloneDoc oneOf
 */
/**
 * Checks if at least one of the given conditions is truthy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if at least one of the conditions is truthy, `false` otherwise.
 *
 * @example
 * ```ts
 * const value = null;
 * oneOf(isNull(value), isUndefined(value)) // true
 * ```
 */
export function oneOfIsTruthy(...conditions: List) {
	return oneOf(...conditions);
}

/**
 * Checks if all of the given conditions are truthy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if all of the conditions are truthy, `false` otherwise.
 *
 * @example
 * ```ts
 * const value = 100;
 * allOf(isNumber(value), isPositive(value)) // true
 * ```
 */
export function allOf(...conditions: List) {
	return conditions.every(Boolean);
}

/**
 * @cloneDoc allOf
 */
/**
 * Checks if all of the given conditions are truthy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if all of the conditions are truthy, `false` otherwise.
 *
 * @example
 * ```ts
 * const value = 100;
 * allOf(isNumber(value), isPositive(value)) // true
 * ```
 */
export function allOfAreTruthy(...conditions: List) {
	return allOf(...conditions);
}

/**
 * Checks if at least one of the given conditions is falsy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if at least one of the conditions is falsy, `false` otherwise.
 *
 * @example
 * ```ts
 * oneOfIsFalsy(true, "") // true
 * oneOfIsFalsy(true, 12, ":)") // false
 * ```
 */
export function oneOfIsFalsy(...conditions: List) {
	return not(allOf(...conditions));
}

/**
 * Checks if all of the given conditions are falsy.
 *
 * @param conditions - The conditions to check.
 *
 * @returns `true` if all of the conditions are falsy, `false` otherwise.
 *
 * @example
 * ```ts
 * allOfAreFalsy(false, "", 0) // true
 * allOfAreFalsy(false, 12, ":)") // false
 * ```
 */
export function allOfAreFalsy(...conditions: List) {
	return not(oneOf(...conditions));
}

/**
 * Checks if at least one of the given conditions is strictly `true`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if at least one condition is `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * oneOfIsTrue(true, false, 1) // true
 * oneOfIsTrue(false, 123, ":)") // false
 * ```
 */
export function oneOfIsTrue(...conditions: List) {
	return conditions.some(isTrue);
}

/**
 * Checks if at least one of the given conditions is not strictly `true`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if at least one condition is not `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * oneOfIsNotTrue(true, "", 0) // true
 * oneOfIsNotTrue(true, true) // false
 * ```
 */
export function oneOfIsNotTrue(...conditions: List) {
	return conditions.some(isNotTrue);
}

/**
 * Checks if all of the given conditions are strictly `true`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if all conditions are `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * allOfAreTrue(true, true) // true
 * allOfAreTrue(true, 123, ":)") // false
 * ```
 */
export function allOfAreTrue(...conditions: List) {
	return conditions.every(isTrue);
}

/**
 * Checks if all of the given conditions are not strictly `true`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if all conditions are not `true`, `false` otherwise.
 *
 * @example
 * ```ts
 * noneOfIsTrue(false, 0, "") // true
 * noneOfIsTrue(true, false) // false
 * ```
 */
export function noneOfIsTrue(...conditions: List) {
	return conditions.every(isNotTrue);
}

/**
 * Checks if at least one of the given conditions is strictly `false`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if at least one condition is `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * oneOfIsFalse(false, true) // true
 * oneOfIsFalse(true, 0, "") // false
 * ```
 */
export function oneOfIsFalse(...conditions: List) {
	return conditions.some(isFalse);
}

/**
 * Checks if at least one of the given conditions is not strictly `false`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if at least one condition is not `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * oneOfIsNotFalse(false, 0, "") // true
 * oneOfIsNotFalse(false, false) // false
 * ```
 */
export function oneOfIsNotFalse(...conditions: List) {
	return conditions.some(isNotFalse);
}

/**
 * Checks if all of the given conditions are strictly `false`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if all conditions are `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * allOfAreFalse(false, false) // true
 * allOfAreFalse(false, 0, "") // false
 * ```
 */
export function allOfAreFalse(...conditions: List) {
	return conditions.every(isFalse);
}

/**
 * Checks if all of the given conditions are not strictly `false`.
 *
 * @param conditions - The conditions to check.
 * @returns `true` if all conditions are not `false`, `false` otherwise.
 *
 * @example
 * ```ts
 * noneOfAreFalse(true, 0, "") // true
 * noneOfAreFalse(false, 0, "") // false
 * ```
 */
export function noneOfAreFalse(...conditions: List) {
	return conditions.every(isNotFalse);
}
