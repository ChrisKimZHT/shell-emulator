<template>
  <HistoryLines :history-content="historyContent" />
  <InputLine prompt-user="chriskim" prompt-host="www.chriskim.cn" :current-dir="currentDir"
    @finished-input="onFinishedInput" @interrupt-input="onInterruptInput" />
</template>

<script>
import HistoryLines from "@/components/HistoryLines.vue";
import InputLine from "@/components/InputLine.vue";
import eventBus from "@/utils/eventBus.js";
import executor from "@/utils/executor.js";

export default {
  name: "ShellContainer",
  components: {
    HistoryLines,
    InputLine
  },
  data() {
    return {
      historyContent: "Welcome to ChrisKim Shell!\n\n",
      currentDir: "/home/chriskim",
    }
  },
  methods: {
    onClear() {
      this.historyContent = "";
    },
    onFinishedInput(shellPrompt, command) {
      this.historyContent += `${shellPrompt}${command}\n`;
      const result = executor(this.currentDir, command);
      if (result !== undefined) {
        this.historyContent += `${result}\n`;
      }
    },
    onInterruptInput(shellPrompt, command) {
      this.historyContent += `${shellPrompt}${command}^C\n`;
    },
  },
  mounted() {
    eventBus.on("ctrl-l", this.onClear);
  },
}
</script>

<style scoped></style>