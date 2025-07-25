import path from "path";
import { type FunctionDeclaration, Project } from "ts-morph";
import { joinRoot, root } from "../_utils";

const project = new Project();

const sourceFiles = project.addSourceFilesAtPaths(joinRoot("src/**/*.ts"));

for (const sourceFile of sourceFiles) {
	const functions = sourceFile.getFunctions();

	for (const func of functions) {
		const funcPos = getFunctionPosition(func);

		const funcDocs = func.getJsDocs();
		const firstDoc = funcDocs.at(0);
		if (!firstDoc) continue;

		const cloneDocTag = firstDoc.getTags().find((tag) => tag.getTagName() === "cloneDoc");
		if (!cloneDocTag) continue;

		const refFuncName = cloneDocTag.getCommentText() ?? "";
		const refFunc = sourceFile.getFunction(refFuncName);
		if (!refFunc) {
			console.log(`${funcPos}: ${refFuncName} not found`);
			continue;
		}

		const refFuncDocs = refFunc.getJsDocs();
		const refFuncDoc = refFuncDocs.at(-1);
		if (!refFuncDoc) {
			console.log(`${funcPos}: ${refFuncName} has no doc`);
			continue;
		}

		const lastDoc = funcDocs.length === 1 ? func.addJsDoc(":)") : funcDocs.at(-1)!;
		lastDoc.replaceWithText(refFuncDoc.getFullText());
	}
}

function getFunctionPosition(func: FunctionDeclaration) {
	const line = func.getStartLineNumber();
	const relativePath = path.relative(root, func.getSourceFile().getFilePath());

	return `${relativePath}:${line}`;
}

project.save();
