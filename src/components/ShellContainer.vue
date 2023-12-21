<template>
  <HistoryLines :history-content="historyContent" />
  <InputLine prompt-user="root" prompt-host="shell-emulator" prompt-path="~" @submit-command="onExecuteCommand"
    @interrupt-command="onInterruptCommand" @clear="onClear" />
</template>

<script>
import HistoryLines from "@/components/HistoryLines.vue";
import InputLine from "./InputLine.vue";
import parseCommand from "@/commandParser.js";

export default {
  name: "ShellContainer",
  components: {
    HistoryLines,
    InputLine
  },
  data() {
    return {
      historyContent: window.Config.shell.welcome,
    }
  },
  methods: {
    onExecuteCommand(shellPrompt, command) {
      /* 执行指令 */
      this.historyContent += `${shellPrompt}${command}\n`;
      if (this.specialCheck(command)) {
        return;
      }
      this.historyContent += parseCommand(command) + "\n";
    },
    onInterruptCommand(shellPrompt, command) {
      /* 中断指令 */
      this.historyContent += `${shellPrompt}${command}^C\n`;
    },
    onClear() {
      /* 清空历史记录 */
      this.historyContent = "";
    },
    specialCheck(command) {
      /* 特判指令，如果被捕获，则特判并返回 true，反之返回 false */
      const trimmedCommand = command.trim();
      if (trimmedCommand.length === 0) {
        return true;
      }
      const splitCommand = trimmedCommand.split(" ");
      const program = splitCommand[0];
      // const args = splitCommand.slice(1);
      if (program === "clear") {
        this.historyContent = "";
        return true;
      }
      return false;
    },

  },
}
</script>

<style scoped></style>