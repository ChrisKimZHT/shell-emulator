# shell-emulator

使用 Vue3 前端框架实现的终端模拟器，具有一定的自定义能力和扩展性，可通过配置文件来个性化。

可以实现一些有趣的功能，例如作为个人主页，用终端的形式来展示自己的信息。

- 展示页面：https://www.chriskim.cn/
- 灵感来源：https://axton.cc/ （似乎已经挂了）

## 配置文件

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

## 文件系统

文件系统实现在 `fsTree.js` 和 `fsFile.js` 中，分别代表文件系统的树结构和储存的文件。

#### 文件

为了灵活性，所有文件均使用函数来进行定义，文件内容为函数返回的字符串。因此文件可以是动态的，如果只需要静态文件可以直接 return 字符串。

例如要定义一个文件 file 内容为 foobar，则编写以下函数：

```js
export function file() { return "foobar"; }
```

#### 树结构

树结构使用嵌套对象完成，如果要实现结构：

```
├─dirA/
│ ├─fileA
│ └─dirB/
└─fileB
```

则对应的对象为：

```js
import { fileA, fileB } from './fsFile.js';

window.fsTree = {
  "dirA": {
    "fileA": fileA,
    "dirB": {}
  },
  "fileB": fileB
};
```

## 添加命令

>  命令实现在 `cmd` 目录，命令注册在 `command.js` 中。如果要添加一个新命令，流程如下：
> 1. 在 `cmd` 目录下创建你的命令，实现命令函数，可选实现提示函数。
> 2. 在 `command.js` 导入你的命令函数以及可选的提示函数。
> 3. 将你的命令函数和可选的提示函数注册到 `externalCommand` 列表中。

#### 传入参数

可使用 `debug` 指令查看

- `cwd`: 执行指令时的工作目录字符串。
- `args`: 指令参数字符串列表。
- `utils`: 框架提供的工具函数，具体用法见下文。

#### 指令本体

```js
export default function foobar(cwd: string, args: string[], utils: object): string {
  return "<div>this is result</div>" ;
}
```

#### 指令提示

```js
export function foobarHint(cwd: string, args: string[], utils: object): string[] {
  return ["hint 1", "hint 2"] ;
}
```

## 工具函数

#### 总览

```js
const utilsEntrance = {
  "checkDesktop": require("./utils/checkDesktop").default,
  "directoryHint": require("./utils/directoryHint").default,
  "eventBus": require("./utils/eventBus").default,
  "fileSystem": require("./utils/fileSystem"),
  "getAbsolutePath": require("./utils/getAbsolutePath").default,
  "getHomeDir": require("./utils/getHomeDir").default,
  "initUptime": require("./utils/initUptime").default,
};
```

#### checkDesktop.js

```js
export default function checkDesktop(): boolean
```

- 若是桌面端返回 `true`，移动端返回 `false`

#### directoryHint.js

```js
export default function directoryHint(cwd: string, cmd: string): string[]
```

- `cwd`: 当前工作目录
- `cmd`: 用户输入的部分
- `return`: 可能的提示列表

#### eventBus.js

```js
const eventBus = mitt();
export default eventBus;
```

就是 mitt 库的 mitt 对象，具体用法见 mitt 库。框架内内置的事件名为：`enter`, `ctrl-c`, `ctrl-l`, `arrow-up`, `arrow-down`, `tab`, `touch`, `interrupt-input`, `finished-input`, `re-input`, `change-dir`.

#### fileSystem.js

```js
export function getFileContent(path: string): string | null
```

获取指定路径文件的内容，返回 null 代表文件不存在。

```js
export function checkDirectory(path: string): boolean
```

检查指定路径是否为目录。

```js
export function checkFile(path: string): boolean
```

检查指定路径是否为文件。

```js
export function listDirectory(path: string): string[] | null
```

获取指定路径目录下的所有文件和目录（已排序），返回 null 代表目录不存在。

```js
export function listDirectoryWithTypes(path: string): string[][] | null
```

获取指定路径目录下的所有文件和目录（已排序且标记类型），返回 null 代表目录不存在。

列表每一项为长度为 2 的列表，第 1 项为 "f" 或 "d" 含义为文件或路径，第二项为名称。

#### getAbsolutePath.js

```js
export default function getAbsolutePath(cwd: string, dest: string): string
```

- `cwd`: 当前工作目录
- `dest`: 目的路径（相对 / 绝对 / 缩写）
- `return`: 拼接好的绝对路径

#### getHomeDir.js

```js
export default function getHomeDir(): string
```

返回当前配置下的用户家目录。

#### initUptime.js

```js
export default function initUptime(): void
```

初始化 Uptime: 如果 Uptime 还未设定或 Uptime 超过最大限制，则将其更新为现在。
