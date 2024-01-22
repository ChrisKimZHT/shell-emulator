// need add command manually
const commandList = [
  "echo",
  "clear",
  "pwd",
  "cd",
  "ls",
  "cat",
  "version",
  "uname",
  "hello",
  "help",
].sort();

export default function help(cwd, args) {
  cwd, args;
  return [
    "Command format: &lt;command&gt; [args...]",
    "Available commands: " + commandList.join(", "),
    "",
    "<span style=\"color: #ccc\">There are also some easter eggs, try to find them all!</span>"
  ].join("\n");
}