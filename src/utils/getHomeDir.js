export default function getHomeDir() {
  if (window.config.username === "root") {
    return "/root";
  } else {
    return "/home/" + window.config.username;
  }
}