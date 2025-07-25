import fs from "fs";
import path from "path";
import { Project } from "ts-morph";
import { joinRoot, root } from "../_utils";

const project = new Project();

const sourceFiles = project.addSourceFilesAtPaths(joinRoot("src/**/index.ts"));

const skipped: string[] = [];

for (const sourceFile of sourceFiles) {
	const lines = sourceFile.getFullText().split("\n");
	const firstLine = lines[0];
	const regexp = /^\s*\/\/\s*@flexTsb\s*$/;
	if (!regexp.test(firstLine)) {
		const relativePath = path.relative(root, sourceFile.getFilePath());
		skipped.push(relativePath);
		continue;
	}

	const exportLineRegexp = /^\s*export/;
	const firstExportLine = lines.findIndex((line) => exportLineRegexp.test(line));

	const startLine = firstExportLine === -1 ? lines.length : firstExportLine;
	const unchangedLines = lines.slice(0, startLine);

	const dir = sourceFile.getDirectoryPath();
	const items = fs
		.readdirSync(dir)
		.map((item) => path.join(dir, item))
		.filter((item) => path.relative(item, sourceFile.getFilePath()) !== "");

	const exports: string[] = [];

	for (const item of items) {
		if (fs.statSync(item).isDirectory() && !fs.readdirSync(item).includes("index.ts")) continue;
		exports.push(path.basename(item, ".ts"));
	}

	const newLines = exports.map((ex) => `export * from "./${ex}";`);
	const newText = [...unchangedLines, ...newLines, ""].join("\n");

	sourceFile.replaceWithText(newText);
}

if (skipped.length > 0) {
	console.info("[INFO] Skipped files due to missing @flexTsb comment:");
	for (const file of skipped) {
		console.info(`- ${file}`);
	}
}

project.save();
