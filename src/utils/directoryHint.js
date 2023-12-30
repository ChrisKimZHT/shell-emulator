import { listDirectory } from "../utils/fileSystem.js";
import getAbsolutePath from "@/utils/getAbsolutePath.js";

export default function directoryHint(cwd, cmd) {
  let absolutePath = getAbsolutePath(cwd, cmd?.trim());
  if (cmd?.endsWith("/") && !absolutePath.endsWith("/")) {
    absolutePath += "/";
  }
  const lastSlashIdx = absolutePath.lastIndexOf("/");
  const prefix = absolutePath.slice(0, lastSlashIdx); // 前面的路径
  const suffix = absolutePath.slice(lastSlashIdx + 1); // 没输完的路径
  const dirList = listDirectory(prefix);
  if (dirList === null) {
    return "";
  }
  for (const dir of dirList) {
    if (dir.startsWith(suffix)) {
      return dir.slice(suffix.length);
    }
  }
  return "";
}