# shell-emulator

使用 Vue3 前端框架实现的终端模拟器，具有一定的自定义能力和扩展性，可通过配置文件来个性化。

可以实现一些有趣的功能，例如作为个人主页，用终端的形式来展示自己的信息。

- 展示页面：https://www.chriskim.cn/
- 灵感来源：https://axton.cc/ （似乎已经挂了）

### 配置文件

```js
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
```

### 文件系统

文件系统实现在 `fsTree.js` 和 `fsFile.js` 中，分别代表文件系统的树结构和储存的文件。

**文件**

为了灵活性，所有文件均使用函数来进行定义，文件内容为函数返回的字符串。因此文件可以是动态的，如果只需要静态文件可以直接 return 字符串。

例如要定义一个文件 B 内容为 foobar，则编写以下函数：

```js
export function B() { return "foobar"; }
```

**树结构**

树结构使用嵌套对象完成，如果要实现结构：

```
├─A
│ ├─B
│ └─C
└─D
```

则对应的对象为：

```js
import { B, C, D } from './fsFile.js';

window.fsTree = {
  "A": {
    "B": B,
    "C": C
  },
  "D": D
};
```

### 添加命令

> 目前版本只有**不依赖于项目内部函数**的命令可以在外部进行添加。如果你想要实现的功能需要调用项目内部函数，例如 fileSystem 处理工具。
>
> 在后续版本可能会使用某些方式，将内部函数向外提供一个接口，方便对命令的扩充。目前版本如果你要使用项目内部函数，请 clone 本工程进行开发后再进行编译。

命令实现在 `cmd` 目录，命令注册在 `command.js` 中。如果要添加一个新命令，流程如下：

1. 在 `cmd` 目录下创建你的命令，实现命令函数，可选实现提示函数。
2. 在 `command.js` 导入你的命令函数以及可选的提示函数。
3. 将你的命令函数和可选的提示函数注册到 `externalCommand` 列表中。

**指令本体**

```js
export default function foobar(cwd, args) {
  return ... ;
}
```

参数（可使用 `debug` 指令查看）：

- `cwd`: 执行指令时的工作目录字符串，例如 `/home/defaultuser`.
- `args`: 指令参数字符串列表，例如 `["--a", "-b", "c"]`.

返回值：

- 字符串，代表执行后的返回结果，可以包含 HTML 语法，例如 `"<div>awa</div>"`.

**指令提示**

```js
export default function foobarHint(cwd, args) {
  return [...] ;
}
```

参数（可使用 `debug` 指令查看）：

- `cwd`: 执行指令时的工作目录字符串，例如 `/home/defaultuser`.
- `args`: 指令参数字符串列表，例如 `["--a", "-b", "c"]`.

返回值：

- 列表，代表可能的补全结果，可以为空，例如 `["a", "all"]`.