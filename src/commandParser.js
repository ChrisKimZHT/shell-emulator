import echo from "./command/echo.js";

export default function parseCommand(command) {
  let trimmedCommand = command.trim();
  if (trimmedCommand.length === 0) {
    return "";
  }
  let splitedCommand = trimmedCommand.split(" ");
  let program = splitedCommand[0];
  let args = splitedCommand.slice(1);
  switch (program) {
    case "echo":
      return echo(args);
    default:
      return `command not found: ${program}`;
  }
}