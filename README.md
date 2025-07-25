# Flex Utils

A collection of TypeScript utilities.

## Installation

```bash
pnpm add flex-utils
```

Or

```bash
yarn add flex-utils
```

## Usage

```ts
import { isString, isDefined } from "flex-utils";

function main(param?: string | (() => string)) {
	if (!isDefined(param)) return;

	if (isString(param)) {
		// ...
	} else {
		// ...
	}
}
```

```ts
import { repeat } from "flex-utils";

repeat(
	({ index, isLast }) => {
		console.log(index);
		if (!isLast) console.log("-".repeat(3));
	},
	{ count: 3 },
);
// 0
// ---
// 1
// ---
// 2
```

## Documentation

Visit The [Documentation Website] (*Not ready yet*) for more information.

