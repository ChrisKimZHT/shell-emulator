import path from "path";

export default function getAbsolutePath(cwd, dest) {
  let absolutePath = "";
  if (dest === undefined || dest === null || dest.length === 0) {
    absolutePath = "/home/chriskim";
  } else if (dest[0] === "~") {
    absolutePath = path.resolve("/home/chriskim" + dest.slice(1));
  } else {
    absolutePath = path.resolve(cwd, dest);
  }
  return absolutePath;
}