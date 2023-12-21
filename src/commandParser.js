import echo from "./command/echo.js";

export default function parseCommand(command) {
  const splitedCommand = command.trim().split(" ");
  const program = splitedCommand[0];
  const args = splitedCommand.slice(1);
  switch (program) {
    case "echo":
      return echo(args);
    default:
      return `command not found: ${program}`;
  }
}