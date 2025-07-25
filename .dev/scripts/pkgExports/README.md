# PkgExports Script

Generates the `exports` field in `package.json` based on the `src` folder.

## How it works

1. Reads the `src` folder and gets all the files (and folders with an `index.ts` file) (1 level deep).
2. Updates the `exports` field in `package.json` based on the files.

## Usage

Just run the script:

```bash
pnpm script pkgExports
```
