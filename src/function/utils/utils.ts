/**
 * Immediately Invoked Function Expression.
 *
 * @param cb - The function to invoke.
 * @param args - The arguments to pass to the function.
 *
 * @returns The return value of the function.
 *
 * @example
 * ```ts
 * const result = iife(() => {
 *   // Calculate result...
 *
 *   return result;
 * })
 * ```
 */

export function iife<Args extends any[], Return>(cb: Func<Args, Return>, ...args: Args): Return {
	return cb(...args);
}
