export default function shutdown(cwd, args) {
  if (args.length > 0) {
    return "shutdown: too many arguments";
  }
  return "System has not been booted with systemd as init system (PID 1). Can't operate.\nFailed to connect to bus: Host is down";
}