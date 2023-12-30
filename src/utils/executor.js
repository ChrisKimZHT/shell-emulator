import echo from "@/commands/echo.js";
import clear from "@/commands/clear.js";
import pwd from "@/commands/pwd.js";
import cd, { cdHint } from "@/commands/cd.js";
import ls, { lsHint } from "@/commands/ls.js";
import cat, { catHint } from "@/commands/cat";
import meow from "@/commands/meow";

const all_commands = [
  { name: "echo", func: echo },
  { name: "clear", func: clear },
  { name: "pwd", func: pwd },
  { name: "cd", func: cd, hint: cdHint },
  { name: "ls", func: ls, hint: lsHint },
  { name: "cat", func: cat, hint: catHint },
  { name: "meow", func: meow }
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
    return "";
  }
  for (const command of all_commands) {
    if (command.name === cmdName) {
      if (cmd.endsWith(" ") || cmd.endsWith("\u00a0")) { // \u00a0 is &nbsp;
        return "";
      }
      return command.hint?.(cwd, cmdSplit.slice(1)) ?? "";
    }
  }
  let hint = "";
  for (const command of all_commands) {
    if (command.name.startsWith(cmdName)) {
      if (hint.length === 0 || hint.length > command.name.length - cmdName.length) {
        hint = command.name.slice(cmdName.length);
      }
    }
  }
  return hint;
}