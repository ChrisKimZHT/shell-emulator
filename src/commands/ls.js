import getAbsolutePath from "@/utils/getAbsolutePath";
import { checkDirectory } from "@/utils/fileSystem";
import { listDirectoryWithTypes } from "@/utils/fileSystem";
import directoryHint from "@/utils/directoryHint";

export default function ls(cwd, args) {
  let isList = false;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      if (arg === "-l") {
        isList = true;
        continue;
      }
      return `ls: unrecognized option '${arg}'`;
    }
  }
  args = args.filter(arg => !arg.startsWith("-"));
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
    const list = listDirectoryWithTypes(abosolutePath);
    if (flag) {
      result.push("");
    }
    if (args.length > 1) {
      result.push(`${abosolutePath}:`);
    }
    const text = [];
    for (const [type, name] of list) {
      if (type === "f") {
        text.push(name);
      } else {
        if (isList) {
          text.push(`<b>${name}/</b>`);
        } else {
          text.push(`<b>${name}</b>`);
        }
      }
    }
    result.push(text.join(isList ? "\n" : "\t"));
    flag = true;
  }
  return error.concat(result).join("\n");
}

export function lsHint(cwd, args) {
  const arg = args[args.length - 1];
  if (arg === undefined) {
    return [];
  }
  // if (arg === "-") {
  //   return "l";
  // }
  return directoryHint(cwd, arg);
}