import echo from "@/commands/echo.js";
import clear from "@/commands/clear.js";
import pwd from "@/commands/pwd.js";

const all_commands = [
  {
    name: "echo",
    func: echo
  },
  {
    name: "clear",
    func: clear
  },
  {
    name: "pwd",
    func: pwd
  }
]

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