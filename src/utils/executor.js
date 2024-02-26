const all_commands = window.externalCommand;

const utilsEntrance = {
  "checkDesktop": require("./checkDesktop").default,
  "directoryHint": require("./directoryHint").default,
  "eventBus": require("./eventBus").default,
  "fileSystem": require("./fileSystem"),
  "getAbsolutePath": require("./getAbsolutePath").default,
  "getHomeDir": require("./getHomeDir").default,
  "initUptime": require("./initUptime").default,
};

export default function executor(cwd, cmd) {
  const cmdSplit = cmd.split(" ").map(x => x.trim()).filter(x => x.length > 0);
  const cmdName = cmdSplit[0];
  if (cmdName === null || cmdName === undefined || cmdName.length === 0) {
    return;
  }
  const cmdArgs = cmdSplit.slice(1);
  for (const command of all_commands) {
    if (command.name === cmdName) {
      return command.func(cwd, cmdArgs, utilsEntrance);
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
      return command.hint?.(cwd, cmdSplit.slice(1), utilsEntrance) ?? [];
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