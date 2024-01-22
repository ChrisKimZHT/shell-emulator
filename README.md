# shell-emulator

使用 Vue3 前端框架实现的终端模拟器，具有一定的自定义能力和扩展性，可以实现一些有趣的功能。例如作为个人主页，用终端的形式来展示自己的信息。

灵感来源（似乎已经挂了）：https://axton.cc/

### 自定义

由于有些逻辑不是很好解耦合，所以本项目没实现配置文件，只能通过修改源代码再编译来自定义内容。为了方便自定义，在此记录几个修改点。

`src/components/ShellContainer.vue`:

1. InputLine 中的 prompt-user: 用户名
2. InputLine 中的 prompt-host: 主机名
3. data 里的 currentDir: 初始工作目录

`src/components/InputLine.vue`:

- this.currentDir 比较的字符串: 用户目录

`src/utils/fileSystemTree.js`:

- tree: 模拟了系统的整个文件系统。每个目录是一个对象；每个文件是一个函数，函数返回值为文件内容。
- readme: 为用户目录下 readme.txt 的函数，返回值即内容。

### 扩展

模拟器中所有指令均在 `src/commands` 中，每个指令必须实现指令本体，可选实现提示。

例如 `test` 指令，指令本体为：`export default function test(cwd, args) { ... }`，指令提示为 `export function testHint(cwd, args) { ... }`.

**参数：**
- cwd: 执行指令时的工作目录字符串
- args: 指令参数字符串列表

**返回值：**
- 本体: 字符串，代表执行后的结构。可以包含 HTML 语法。
- 提示: 字符串列表，代表指令补全提示，可以有多个可能的提示。

编写好指令逻辑后，在 `src/utils/executor.js` 的 `all_commands` 注册指令即可。