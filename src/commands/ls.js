import getAbsolutePath from "@/utils/getAbsolutePath";
import { checkDirectory } from "@/utils/fileSystem";
import { listDirectory } from "@/utils/fileSystem";
import directoryHint from "@/utils/directoryHint";

export default function ls(cwd, args) {
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      return `ls: unrecognized option '${arg}'`;
    }
  }
  let error = [], result = [];
  let flag = false;
  if (args.length === 0) {
    args.push(".");
  }
  for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (!checkDirectory(abosolutePath)) {
      error.push(`ls: cannot access '${abosolutePath}': No such file or directory`);
      continue;
    }
    const list = listDirectory(abosolutePath);
    if (flag) {
      result.push("");
    }
    if (args.length > 1) {
      result.push(`${abosolutePath}:`);
    }
    result.push(list.join("\t"));
    flag = true;
  }
  return error.concat(result).join("\n");
}

export function lsHint(cwd, args) {
  const arg = args[args.length - 1];
  if (arg === undefined) {
    return "";
  }
  if (arg.startsWith("-")) {
    return "";
  }
  return directoryHint(cwd, arg);
}