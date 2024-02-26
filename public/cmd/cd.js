export default function cd(cwd, cmd, utils) {
  const { getAbsolutePath, eventBus } = utils;
  const { checkDirectory } = utils.fileSystem;

  if (cmd.length > 1) {
    return "cd: too many arguments";
  }
  const absolutePath = getAbsolutePath(cwd, cmd[0]?.trim());
  if (!checkDirectory(absolutePath)) {
    return `cd: ${absolutePath}: No such file or directory`;
  }
  eventBus.emit("change-dir", absolutePath);
  return;
}

export function cdHint(cwd, cmd, utils) {
  const { directoryHint } = utils;

  if (cmd.length > 1) {
    return [];
  }
  return directoryHint(cwd, cmd[0]);
}