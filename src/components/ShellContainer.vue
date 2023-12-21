<template>
  <HistoryLines :history-text="historyText" />
  <InputLine user="root" host="shell-emulator" path="~" @submit-command="executeCommand"
    @interrupt-command="interruptCommand" />
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
      historyText: window.Config.shell.welcome,
    }
  },
  methods: {
    executeCommand(shellPrompt, command) {
      /* 执行指令 */
      this.historyText += `${shellPrompt}${command}\n`;
      if (this.specialCheck(command)) {
        return;
      }
      this.historyText += parseCommand(command) + "\n";
    },
    interruptCommand(shellPrompt, command) {
      /* 中断指令 */
      this.historyText += `${shellPrompt}${command}^C\n`;
    },
    specialCheck(command) {
      /* 特判指令，如果被捕获，则特判并返回 true，反之返回 false */
      let trimmedCommand = command.trim();
      if (command.length === 0) {
        return true;
      } else if (trimmedCommand === "clear") {
        this.historyText = "";
        return true;
      }
      return false;
    },
    handleKeydown() {
      /* 处理键盘事件 */
      if (event.key.toLowerCase() === "l" && event.ctrlKey) {
        event.preventDefault();
        this.historyText = "";
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }
}
</script>

<style scoped></style>