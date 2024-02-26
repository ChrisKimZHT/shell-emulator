<template>
  <HistoryLines :history-content="historyContent" />
  <InputLine :current-dir="currentDir" @finished-input="onFinishedInput" @interrupt-input="onInterruptInput"
    @re-input="onReInput" />
</template>

<script>
import HistoryLines from "@/components/HistoryLines.vue";
import InputLine from "@/components/InputLine.vue";
import eventBus from "@/utils/eventBus.js";
import executor from "@/executor.js";
import getHomeDir from "@/utils/getHomeDir.js";

export default {
  name: "ShellContainer",
  components: {
    HistoryLines,
    InputLine
  },
  data() {
    return {
      historyContent: window.config.initialContent,
      currentDir: getHomeDir(),
    }
  },
  methods: {
    onClear() {
      this.historyContent = "";
    },
    onFinishedInput(shellPrompt, command) {
      this.historyContent += `${shellPrompt}${command}\n`;
      const result = executor(this.currentDir, command);
      if (result !== undefined && result !== null && result.length > 0) {
        this.historyContent += `${result}\n`;
      }
      this.$nextTick(() => {
        document.querySelector("#input-line").scrollIntoView();
      });
    },
    onInterruptInput(shellPrompt, command) {
      this.historyContent += `${shellPrompt}${command}^C\n`;
      this.$nextTick(() => {
        document.querySelector("#input-line").scrollIntoView();
      });
    },
    onReInput(shellPrompt, command, content) {
      this.historyContent += `${shellPrompt}${command}\n`;
      this.historyContent += `${content}\n`;
      this.$nextTick(() => {
        document.querySelector("#input-line").scrollIntoView();
      });
    },
    onChangeDir(newDir) {
      this.currentDir = newDir;
    },
  },
  mounted() {
    eventBus.on("ctrl-l", this.onClear);
    eventBus.on("change-dir", this.onChangeDir);
  },
  beforeUnmount() {
    eventBus.off("ctrl-l", this.onClear);
    eventBus.off("change-dir", this.onChangeDir);
  }
}
</script>

<style scoped></style>