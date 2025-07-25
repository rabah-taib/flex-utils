import { isFalse } from "../../boolean";
import { indexToNumber, isNumber } from "../../number";
import { objHas } from "../../object";

/**
 * Data passed to the repeat callback for each iteration.
 */
export type RepeatData = {
	/** The current index of the loop (starts from `start` or 0). */
	index: number;
	/** The current index + 1. */
	number: number;
	/** Whether this is the first iteration. */
	isFirst: boolean;
	/** Whether this is the last iteration (always `false` for whileFn-based repeat). */
	isLast: boolean;
	/** The current loop number (starts from 1). */
	loopNumber: number;
};

/**
 * Callback function type for the repeat utility.
 *
 * Returning `false` will break the loop early.
 * Returning a `number` will set the next index to that value.
 */
export type RepeatCallback = (data: RepeatData) => number | boolean | void;

/**
 * Options for the repeat utility.
 *
 * - Use `count` for a fixed number of iterations.
 * - Use `whileFn` for a condition-based loop.
 * - `start` sets the initial index (default: 0).
 * - `step` sets the increment per iteration (default: 1).
 */
export type RepeatOptions =
	| {
			/** Number of times to repeat. */
			count: number;
			/** Starting index (default: 0). */
			start?: number;
			/** Step increment (default: 1). */
			step?: number;
	  }
	| {
			/** Function that returns `true` to continue, `false` to stop. */
			whileFn: Func<[], boolean>;
			/** Starting index (default: 0). */
			start?: number;
			/** Step increment (default: 1). */
			step?: number;
	  };

/**
 * Repeats a callback function a specified number of times or while a condition is true.
 *
 * - If `opts` contains `count`, the callback is called `count` times.
 * - If `opts` contains `whileFn`, the callback is called while `whileFn()` returns `true`.
 * - The callback receives an object with the current index, number, isFirst, isLast, and loopNumber.
 * - Returning `false` from the callback breaks the loop early.
 * - Returning a `number` from the callback sets the next index to that value.
 *
 * @param cb - The callback function to execute on each iteration.
 * @param opts - The repeat options (either count-based or whileFn-based).
 *
 * @throws {Error} If neither `count` nor `whileFn` is provided in options.
 *
 * @example
 * // Repeat 5 times
 * repeat(({ index }) => { console.log(index); }, { count: 3 });
 * // 0
 * // 1
 * // 2
 *
 * // Repeat while a condition is true
 * let i = 0;
 * repeat(() => {
 *   console.log(i);
 *   i++;
 * }, { whileFn: () => i < 3 });
 * // 0
 * // 1
 * // 2
 */
export function repeat(cb: RepeatCallback, opts: RepeatOptions): void {
	if (objHas(opts, "count")) {
		for (
			let index = opts.start ?? 0, loopNumber = 1;
			index < opts.count;
			index += opts.step ?? 1, loopNumber++
		) {
			const number = indexToNumber(index);
			const data: RepeatData = {
				index,
				number,
				isFirst: index === opts.start,
				isLast: number === opts.count,
				loopNumber,
			};
			const result = cb(data);
			if (isFalse(result)) break;
			else if (isNumber(result)) index = result;
		}
	} else if (objHas(opts, "whileFn")) {
		let index = opts.start ?? 0;
		let loopNumber = 1;

		while (true) {
			if (isFalse(opts.whileFn())) break;

			const number = indexToNumber(index);
			const data: RepeatData = {
				index,
				number,
				isFirst: index === opts.start,
				isLast: false,
				loopNumber,
			};

			const result = cb(data);
			if (isFalse(result)) break;
			else if (isNumber(result)) index = result;

			index += opts.step ?? 1;
			loopNumber++;
		}
	} else {
		throw new Error("One of the following options must be provided: `count` or `whileFn`");
	}
}
