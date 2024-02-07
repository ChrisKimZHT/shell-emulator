export default function uptime(cwd, args) {
  if (args.length > 0) {
    return "uptime: too many arguments";
  }
  const upStamp = parseInt(localStorage.getItem("uptime"));
  const nowDate = new Date();
  const nowHour = nowDate.getHours();
  const nowMinute = nowDate.getMinutes();
  const nowSecond = nowDate.getSeconds();
  const nowStamp = nowDate.getTime();
  const upTime = nowStamp - upStamp;
  const upHour = Math.floor((upTime % 86400000) / 3600000);
  const upMinute = Math.floor((upTime % 3600000) / 60000);
  return ` ${String(nowHour).padStart(2, '0')}:${String(nowMinute).padStart(2, '0')}:${String(nowSecond).padStart(2, '0')} up ${upHour} hours, ${upMinute} minutes,  1 user,  load average: 0.01, 0.01, 0.00`
}