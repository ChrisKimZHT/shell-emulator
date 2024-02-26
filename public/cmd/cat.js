export default function cat(cwd, args, utils) {
  const { getAbsolutePath } = utils;
  const { checkDirectory, checkFile, getFileContent } = utils.fileSystem;

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
    result.push(file);
  }
  return result.join("\n");
}

export function catHint(cwd, args, utils) {
  const { directoryHint } = utils;
  const arg = args[args.length - 1];
  if (arg === undefined) {
    return [];
  }
  if (arg.startsWith("-")) {
    return [];
  }
  return directoryHint(cwd, arg);
}