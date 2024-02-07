export default function debug(cwd, args) {
  return `cwd: ${cwd}\nargs: [${args.map(arg => `"${arg}"`).join(", ")}]\n`;
}