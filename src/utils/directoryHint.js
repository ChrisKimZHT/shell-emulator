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
    return [];
  }
  const result_normal = [], result_hidden = [];
  for (const dir of dirList) {
    if (dir.startsWith(suffix)) {
      if (dir.startsWith(".")) {
        result_hidden.push(dir.slice(suffix.length));
      } else {
        result_normal.push(dir.slice(suffix.length));
      }
    }
  }
  return result_normal.concat(result_hidden); // 保证正常文件在前
}