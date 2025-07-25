import fs from "fs-extra";
import path from "path";
import { joinRoot } from "../_utils";

const src = joinRoot("src");
const files = fs.readdirSync(src).filter((file) => {
	const isIgnored = file.startsWith("_") || file === "index.ts";
	if (isIgnored) return false;

	const filePath = joinRoot("src", file);
	const isFile = fs.statSync(filePath).isFile();
	if (isFile) return true;

	const indexPath = path.join(filePath, "index.ts");
	const hasIndex = fs.existsSync(indexPath);
	return hasIndex;
});

const newExports = [
	[
		".",
		{
			types: "./dist/index.d.ts",
			require: "./dist/index.js",
			import: "./dist/index.mjs",
		},
	],
].concat(
	files.map((file) => [
		`./${path.basename(file, ".ts")}`,
		{
			types: `./dist/${file}.d.ts`,
			require: `./dist/${file}.js`,
			import: `./dist/${file}.mjs`,
		},
	]),
);

const pkgPath = joinRoot("package.json");
const pkg = fs.readJSONSync(pkgPath);
pkg.exports = Object.fromEntries(newExports);
fs.writeJSONSync(pkgPath, pkg, { spaces: 2 });
