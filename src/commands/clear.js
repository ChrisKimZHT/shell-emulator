import eventBus from "@/utils/eventBus";

export default function clear(cwd, args) {
  if (args.length > 0) {
    return "clear: too many arguments";
  }
  eventBus.emit("ctrl-l");
  return;
}