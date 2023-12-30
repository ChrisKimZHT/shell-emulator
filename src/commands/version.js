export default function version(cwd, cmd) {
  cwd, cmd;
  const res =
    "\n\n" +
    "=======================\n" +
    ` Shell Emulator v${window.appVersion}\n` +
    "-----------------------\n" +
    "Author: ChrisKimZHT\n" +
    "GitHub: shell-emulator\n" +
    "=======================\n\n";
  return res;
}