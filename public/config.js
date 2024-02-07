window.config = {
  // [用户名] 请务必保证fsTree中有该用户的家目录/home/<username>，root用户家目录为/root。
  username: "defaultuser",
  // [主机名] 命令提示符中显示的主机名
  hostname: "emulator",
  // [提示符格式] {}表示的内容会被动态替换，不要修改这三个变量，仅修改前后的字符或顺序。
  prompt: "[{user}@{host} {cwd}]$ ",
  // [初始内容] 页面加载时显示的初始内容，支持HTML
  initialContent: `<a href="https://github.com/ChrisKimZHT/shell-emulator" target="_blank">shell-emulator</a> v${window.appVersion} by ChrisKimZHT\n\n`,
  // [开机时间上限] 超过这个时间后，会强制刷新为0，单位ms，该值决定了uptime和/procs/uptime的最大值
  uptimeLimitMS: 3600000
}