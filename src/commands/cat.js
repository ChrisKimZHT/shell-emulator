import getAbsolutePath from "@/utils/getAbsolutePath.js";
import { getFileContent, checkFile, checkDirectory } from "../utils/fileSystem.js";

export default function cat(cwd, args) {
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      return `ls: unrecognized option '${arg}'`;
    }
  }
  const result = [];
  if (args.length === 0) {
    args.push(".");
  }
  for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (checkDirectory(abosolutePath)) { 
      result.push(`cat: ${abosolutePath}: Is a directory`);
      continue;
    }
    if (!checkFile(abosolutePath)) {
      result.push(`cat: ${arg}: No such file or directory`);
      continue;
    }
    const file = getFileContent(abosolutePath);
    if (file.startsWith("[FUNCTION]")) {
      const func = eval(file.slice(10));
      result.push(func());
      continue;
    }
    result.push(file);
  }
  return result.join("\n");
}