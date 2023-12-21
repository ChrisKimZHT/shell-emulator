import echo from "./command/echo.js";

export default function parseCommand(command) {
  let splitedCommand = command.trim().split(" ");
  let program = splitedCommand[0];
  let args = splitedCommand.slice(1);
  switch (program) {
    case "echo":
      return echo(args);
    default:
      return `command not found: ${program}`;
  }
}