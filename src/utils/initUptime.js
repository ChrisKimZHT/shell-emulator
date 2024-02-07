export default function initUptime() {
  if (localStorage.getItem("uptime") === null || localStorage.getItem("uptime") === undefined) {
    localStorage.setItem("uptime", Date.now());
    return;
  }
  if (Date.now() - localStorage.getItem("uptime") > window.config.uptimeLimitMS) {
    localStorage.setItem("uptime", Date.now());
    return;
  }
}