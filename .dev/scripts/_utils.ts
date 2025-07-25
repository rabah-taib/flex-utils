import path from "path";

export const root = path.join(__dirname, "../../");
export const joinRoot = (...paths: string[]) => path.join(root, ...paths);
export const relativeRoot = (...paths: string[]) => path.relative(root, joinRoot(...paths));
