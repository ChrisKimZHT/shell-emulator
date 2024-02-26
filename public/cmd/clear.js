export default function clear(cwd, args, utils) {
  const { eventBus } = utils;
  if (args.length > 0) {
    return "clear: too many arguments";
  }
  eventBus.emit("ctrl-l");
  return;
}