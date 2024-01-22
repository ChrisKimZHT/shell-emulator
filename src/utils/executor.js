import echo from "@/commands/echo.js";
import clear from "@/commands/clear.js";
import pwd from "@/commands/pwd.js";
import cd, { cdHint } from "@/commands/cd.js";
import ls, { lsHint } from "@/commands/ls.js";
import cat, { catHint } from "@/commands/cat";
import meow from "@/commands/meow";
import version from "@/commands/version";
import uname, { unameHint } from "@/commands/uname";
import hello from "@/commands/hello";
import ciallo from "@/commands/ciallo";
import help from "@/commands/help";
import shutdown from "@/commands/shutdown";
import reboot from "@/commands/reboot";
import uptime from "@/commands/uptime";

const all_commands = [
  { name: "echo", func: echo },
  { name: "clear", func: clear },
  { name: "pwd", func: pwd },
  { name: "cd", func: cd, hint: cdHint },
  { name: "ls", func: ls, hint: lsHint },
  { name: "cat", func: cat, hint: catHint },
  { name: "meow", func: meow},
  { name: "version", func: version },
  { name: "uname", func: uname, hint: unameHint },
  { name: "hello", func: hello },
  { name: "ciallo", func: ciallo},
  { name: "help", func: help },
  { name: "shutdown", func: shutdown },
  { name: "reboot", func: reboot },
  { name: "uptime", func: uptime }
];

export default function executor(cwd, cmd) {
  const cmdSplit = cmd.split(" ").map(x => x.trim()).filter(x => x.length > 0);
  const cmdName = cmdSplit[0];
  if (cmdName === null || cmdName === undefined || cmdName.length === 0) {
    return;
  }
  const cmdArgs = cmdSplit.slice(1);
  for (const command of all_commands) {
    if (command.name === cmdName) {
      return command.func(cwd, cmdArgs);
    }
  }
  return `${cmdName}: command not found`;
}

export function getHint(cwd, cmd) {
  const cmdSplit = cmd.split(" ").map(x => x.trim()).filter(x => x.length > 0);
  const cmdName = cmdSplit[0];
  if (cmdName === null || cmdName === undefined || cmdName.length === 0) {
    return [];
  }
  if (cmd.endsWith(" ") || cmd.endsWith("\u00a0")) { // \u00a0 is &nbsp;
    return [];
  }
  for (const command of all_commands) {
    if (command.name === cmdName) {
      return command.hint?.(cwd, cmdSplit.slice(1)) ?? [];
    }
  }
  if (cmdSplit.length > 1) {
    return [];
  }
  let hint = [];
  for (const command of all_commands) {
    if (command.name.startsWith(cmdName)) {
      hint.push(command.name.slice(cmdName.length));
    }
  }
  hint.sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  return hint;
}