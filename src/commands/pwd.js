export default function pwd(cwd, args) {
  if (args.length > 0) {
    return "pwd: too many arguments";
  }
  return cwd;
}