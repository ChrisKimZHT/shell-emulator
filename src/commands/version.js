export default function version(cwd, args) {
  if (args.length > 0) {
    return "version: too many arguments";
  }
  const res =
    "\n\n" +
    "=======================\n" +
    ` Shell Emulator v${window.appVersion}\n` +
    "-----------------------\n" +
    "Author: <a href=\"https://github.com/ChrisKimZHT\" target=\"_blank\">ChrisKimZHT</a>\n" +
    "GitHub: <a href=\"https://github.com/ChrisKimZHT/shell-emulator\" target=\"_blank\">shell-emulator</a>\n" +
    "=======================\n\n";
  return res;
}