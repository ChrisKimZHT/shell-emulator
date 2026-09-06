// ==================== cat ====================

function cat(cwd, args, utils) {
  const { getAbsolutePath } = utils;
  const { checkDirectory, checkFile, getFileContent } = utils.fileSystem;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) return `cat: unrecognized option '${arg}'`;
  }
  const result = [];
  if (args.length === 0) args.push(".");
  for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (checkDirectory(abosolutePath)) result.push(`cat: ${abosolutePath}: Is a directory`);
    else if (!checkFile(abosolutePath)) result.push(`cat: ${arg}: No such file or directory`);
    else result.push(getFileContent(abosolutePath));
  }
  return result.join("\n");
}

function catHint(cwd, args, utils) {
  const arg = args[args.length - 1];
  if (arg === undefined || arg.startsWith("-")) return [];
  return utils.directoryHint(cwd, arg);
}

// ==================== cd ====================

function cd(cwd, args, utils) {
  const { getAbsolutePath, eventBus } = utils;
  if (args.length > 1) return "cd: too many arguments";
  const absolutePath = getAbsolutePath(cwd, args[0]?.trim());
  if (!utils.fileSystem.checkDirectory(absolutePath)) return `cd: ${absolutePath}: No such file or directory`;
  eventBus.emit("change-dir", absolutePath);
}

function cdHint(cwd, args, utils) {
  return args.length > 1 ? [] : utils.directoryHint(cwd, args[0]);
}

// ==================== clear ====================

function clear(cwd, args, utils) {
  if (args.length > 0) return "clear: too many arguments";
  utils.eventBus.emit("ctrl-l");
}

// ==================== debug ====================

function debug(cwd, args, utils) {
  return [`cwd: ${cwd}`, `args: [${args.map(arg => `"${arg}"`).join(", ")}]`, `utils: [${Object.keys(utils).join(", ")}]`, ""].join("\n");
}

// ==================== echo ====================

function echo(cwd, args) {
  return args.join(" ");
}

// ==================== help ====================

const helpCommandList = ["echo", "clear", "pwd", "cd", "ls", "cat", "version", "uname", "hello", "help"].sort();
function help(cwd, args) {
  if (args.length > 0) return "help: too many arguments";
  return [
    "Command format: &lt;command&gt; [args...]",
    "Available commands: " + helpCommandList.join(", "),
    "",
    "<span style=\"color: #ccc\">There are also some easter eggs, try to find them all!</span>"
  ].join("\n");
}

// ==================== ls ====================

function list(cwd, args, utils, longFormat) {
  const { getAbsolutePath } = utils;
  const { checkDirectory, listDirectoryWithTypes } = utils.fileSystem;
  let isAll = false;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      if (arg === "-a") isAll = true;
      else return `ls: unrecognized option '${arg}'`;
    }
  }
  args = args.filter(arg => !arg.startsWith("-"));
  const error = [], result = [];
  let hasPreviousResult = false;
  if (args.length === 0) args.push(".");
  for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (!checkDirectory(abosolutePath)) {
      error.push(`ls: cannot access '${abosolutePath}': No such file or directory`);
      continue;
    }
    let entries = listDirectoryWithTypes(abosolutePath);
    if (hasPreviousResult) result.push("");
    if (args.length > 1) result.push(`${abosolutePath}:`);
    entries = isAll ? [["d", "."], ["d", ".."], ...entries] : entries.filter(([, name]) => !name.startsWith("."));
    result.push(entries.map(([type, name]) => type === "f" ? name : longFormat ? `<b>${name}</b>/` : `<b>${name}</b>`).join(longFormat ? "\n" : "\t\t"));
    hasPreviousResult = true;
  }
  return error.concat(result).join("\n");
}

function ls(cwd, args, utils) {
  return list(cwd, args, utils, false);
}

// ==================== ll ====================

function ll(cwd, args, utils) {
  return list(cwd, args, utils, true);
}

function listHint(cwd, args, utils) {
  const arg = args[args.length - 1];
  if (arg === undefined) return [];
  return arg === "-" ? ["a"] : utils.directoryHint(cwd, arg);
}

// ==================== pwd ====================

function pwd(cwd, args) {
  return args.length > 0 ? "pwd: too many arguments" : cwd;
}

// ==================== reboot ====================

function reboot(cwd, args) {
  return args.length > 0 ? "reboot: too many arguments" : "System has not been booted with systemd as init system (PID 1). Can't operate.\nFailed to connect to bus: Host is down";
}

// ==================== shutdown ====================

function shutdown(cwd, args) {
  return args.length > 0 ? "shutdown: too many arguments" : "System has not been booted with systemd as init system (PID 1). Can't operate.\nFailed to connect to bus: Host is down";
}

// ==================== uname ====================

function uname(cwd, args) {
  let all = false;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      if (arg === "-a" || arg === "--all") all = true;
      else return `uname: unrecognized option '${arg}'`;
    }
  }
  return all ? `chriskimOS www.chriskim.cn ${window.appVersion}-generic #187-chriskim SMP Wed Dec 20 15:08:11 UTC 2023 x86_64 x86_64 x86_64 ChrisKimZHT/shell-emulator` : "chriskimOS";
}

function unameHint(cwd, args) {
  const arg = args[args.length - 1];
  return arg === "-" ? ["a"] : arg === "--" ? ["all"] : [];
}

// ==================== uptime ====================

function uptime(cwd, args) {
  if (args.length > 0) return "uptime: too many arguments";
  const upStamp = parseInt(localStorage.getItem("uptime"));
  const nowDate = new Date();
  const upTime = nowDate.getTime() - upStamp;
  const upHour = Math.floor((upTime % 86400000) / 3600000);
  const upMinute = Math.floor((upTime % 3600000) / 60000);
  return ` ${String(nowDate.getHours()).padStart(2, "0")}:${String(nowDate.getMinutes()).padStart(2, "0")}:${String(nowDate.getSeconds()).padStart(2, "0")} up ${upHour} hours, ${upMinute} minutes,  1 user,  load average: 0.01, 0.01, 0.00`;
}

// ==================== version ====================

function version(cwd, args) {
  if (args.length > 0) return "version: too many arguments";
  return "\n\n=======================\n" + ` Shell Emulator v${window.appVersion}\n` + "-----------------------\n" + "Author: <a href=\"https://github.com/ChrisKimZHT\" target=\"_blank\">ChrisKimZHT</a>\n" + "GitHub: <a href=\"https://github.com/ChrisKimZHT/shell-emulator\" target=\"_blank\">shell-emulator</a>\n" + "=======================\n\n";
}

// ==================== command registry ====================

window.externalCommand = [
  { name: "cat", func: cat, hint: catHint },
  { name: "cd", func: cd, hint: cdHint },
  { name: "clear", func: clear },
  { name: "debug", func: debug },
  { name: "echo", func: echo },
  { name: "help", func: help },
  { name: "ll", func: ll, hint: listHint },
  { name: "ls", func: ls, hint: listHint },
  { name: "pwd", func: pwd },
  { name: "reboot", func: reboot },
  { name: "shutdown", func: shutdown },
  { name: "uname", func: uname, hint: unameHint },
  { name: "uptime", func: uptime },
  { name: "version", func: version }
];
