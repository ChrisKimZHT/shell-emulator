const tree = window.fsTree;

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
  return Object.keys(current).sort();
}

export function listDirectoryWithTypes(path) {
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
  const result = []
  for (const key of Object.keys(current).sort()) {
    result.push([typeof current[key] === "function" ? "f" : "d", key]);
  }
  return result;
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