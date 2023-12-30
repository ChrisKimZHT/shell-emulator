export default function uname(cwd, args) {
  let all = false;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      if (arg === "-a" || arg === "--all") {
        all = true;
        continue;
      }
      return `uname: unrecognized option '${arg}'`;
    }
  }
  if (!all) {
    return "chriskimOS";
  } else {
    return `chriskimOS www.chriskim.cn ${window.appVersion}-generic #187-chriskim SMP Wed Dec 20 15:08:11 UTC 2023 x86_64 x86_64 x86_64 ChrisKimZHT/shell-emulator`;
  }
}

export function unameHint(cwd, args) {
  const arg = args[args.length - 1];
  if (arg === "-") {
    return "a";
  } else if (arg === "--") {
    return "all";
  } else {
    return "";
  }
}