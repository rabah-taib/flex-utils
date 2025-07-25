import { execSync } from "child_process";
import fs from "fs";
import { relativeRoot } from "./_utils";

const parts = process.argv.slice(2);
const path = relativeRoot(".dev/scripts/", ...parts);

if (!fs.existsSync(path)) {
	console.log(`Script not found: ${path}`);
	process.exit(1);
}

execSync(`tsx ${path}`, { stdio: "inherit" });
