import getAbsolutePath from "@/utils/getAbsolutePath.js";
import { checkDirectory } from "@/utils/fileSystem.js";
import directoryHint from "@/utils/directoryHint.js";
import eventBus from "@/utils/eventBus";

export default function cd(cwd, cmd) {
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

export function cdHint(cwd, cmd) {
  if (cmd.length > 1) {
    return "";
  }
  return directoryHint(cwd, cmd[0]);
}