# cloneJsDocs Script

Synchronize JSDoc comments between functions using `@cloneDoc` tag.

## Why?

When creating an alias function, you will use the same JSDoc comment for both functions. This script will synchronize the JSDoc comments between the alias and the original function.

## How it works

1. The script scans all TypeScript files in the `src` directory.
2. It looks for functions that have the tag `@cloneDoc <functionName>` in their **first** JSDoc comment.
3. When it finds one, it locates the referenced function (`<functionName>`) and copies its JSDoc comment.
4. The script then replaces the function's last JSDoc comment with the copied one.

## Usage

First you will need an existing function with JSDoc comment:

````ts
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
````

Now create the alias function and add the `@cloneDoc` tag in the first JSDoc comment:

```ts
/**
 * @cloneDoc negate
 */
export function not<T extends boolean>(value: T): Negate<T> {
	return negate(value);
}
```

Run the script:

```bash
pnpm script cloneJsDocs
```

See the result:

````ts
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
````
