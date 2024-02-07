import path from "path";
import getHomeDir from "./getHomeDir";

export default function getAbsolutePath(cwd, dest) {
  let absolutePath = "";
  if (dest === undefined || dest === null || dest.length === 0) {
    absolutePath = getHomeDir();
  } else if (dest[0] === "~") {
    absolutePath = path.resolve(getHomeDir() + dest.slice(1));
  } else {
    absolutePath = path.resolve(cwd, dest);
  }
  return absolutePath;
}