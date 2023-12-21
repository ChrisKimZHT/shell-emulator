
import getAbsolutePath from "@/utils/getAbsolutePath.js";
import { checkDirectory } from "../utils/fileSystem.js";
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