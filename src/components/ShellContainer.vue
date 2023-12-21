<template>
  <HistoryLines :history-content="historyContent" />
  <InputLine :prompt-user="promptUser" :prompt-host="promptHost" :prompt-path="workingDirectory"
    @submit-command="onExecuteCommand" @interrupt-command="onInterruptCommand" @clear="clearHistory" />
</template>

<script>
import HistoryLines from "@/components/HistoryLines.vue";
import InputLine from "@/components/InputLine.vue";

export default {
  name: "ShellContainer",
  components: {
    HistoryLines,
    InputLine
  },
  data() {
    return {
      historyContent: window.Config.shell.welcome,
      promptUser: window.Config.shell.user,
      promptHost: window.Config.shell.host,
      workingDirectory: "~"
    }
  },
  methods: {
    onExecuteCommand(shellPrompt, command) {
      /* 执行指令 */
      this.historyContent += `${shellPrompt}${command}\n`;
      const result = this.execute(this.workingDirectory, command);
      if (result.startsWith("<<< ") && result.endsWith(" >>>")) {
        this.specialOperation(result.slice(4, -4));
        return;
      }
      this.historyContent += result + "\n";
    },
    onInterruptCommand(shellPrompt, command) {
      /* 中断指令 */
      this.historyContent += `${shellPrompt}${command}^C\n`;
    },
    clearHistory() {
      /* 清空历史记录 */
      this.historyContent = "";
    },
    execute(workingDirectory, command) {
      const splitedCommand = command.trim().split(" ");
      const program = splitedCommand[0];
      const args = splitedCommand.slice(1);
      if (workingDirectory === "~") {
        workingDirectory = `/home/${window.Config.shell.user}`;
      }
      for (const command of window.Commands) {
        if (command.name === program) {
          return command.func(workingDirectory, args);
        }
      }
      return `${program}: command not found`;
    },
    specialOperation(operation) {
      /* 特殊指令 */
      operation = operation.trim();
      const splitedOperation = operation.split(":");
      const type = splitedOperation[0];
      const args = splitedOperation[1];
      if (type === "CLEAR") {
        this.clearHistory();
      } else if (type === "CD") {
        this.workingDirectory = args;
      }
    }
  },
}
</script>

<style scoped></style>