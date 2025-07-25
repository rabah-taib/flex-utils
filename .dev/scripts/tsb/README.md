# tsb Script

Create TypeScript barrel files using `// @flexTsb` comment.

## Why?

Automatically create barrel files so you never forget to export some files.

## How it works

1. The script searches for all `index.ts` files in the `src` directory.
2. It checks if the first line is this comment: `// @flexTsb`.
3. If it does, it exports all files in the directory.

> Lines before the first export line are kept untouched.

## Usage

1. Create an `index.ts` file in the `src` directory.
2. Add the comment to the first line.
   ```ts
   // @flexTsb
   ```
3. Run the script:
   ```bash
   pnpm script tsb
   ```
4. See the result:

   ```ts
   // @flexTsb

   export * from "./string";
   export * from "./number";
   // ...
   ```
