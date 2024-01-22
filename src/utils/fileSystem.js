import { tree } from "./fileSystemTree";

export function getFileContent(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return null;
    }
    current = current[dir];
  }
  if (typeof current !== "function") {
    return null;
  }
  return current();
}

export function checkDirectory(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return false;
    }
    current = current[dir];
  }
  if (typeof current === "function") {
    return false;
  }
  return true;
}

export function listDirectory(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return null;
    }
    current = current[dir];
  }
  if (typeof current === "function") {
    return null;
  }
  return Object.keys(current);
}

export function checkFile(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return false;
    }
    current = current[dir];
  }
  if (typeof current !== "function") {
    return false;
  }
  return true;
}