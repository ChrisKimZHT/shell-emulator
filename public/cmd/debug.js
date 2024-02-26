export default function debug(cwd, args, utils) {
  return [
    `cwd: ${cwd}`,
    `args: [${args.map(arg => `"${arg}"`).join(", ")}]`,
    `utils: [${Object.keys(utils).join(", ")}]`,
    ``,
  ].join("\n");
}