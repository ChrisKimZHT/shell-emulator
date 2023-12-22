export default function initUptime() {
  if (localStorage.getItem("uptime") === null || localStorage.getItem("uptime") === undefined) {
    localStorage.setItem("uptime", Date.now());
    return;
  }
  if (Date.now() - localStorage.getItem("uptime") > 3600000) {
    localStorage.setItem("uptime", Date.now());
    return;
  }
}