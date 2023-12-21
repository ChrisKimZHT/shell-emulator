<template>
  <HistoryContent :history-text="historyText" />
  <InputLine user="root" host="shell-emulator" path="~" @submit-command="executeCommand"
    @interrupt-command="interruptCommand" />
</template>

<script>
import HistoryContent from "@/components/HistoryContent.vue";
import InputLine from "./InputLine.vue";
import parseCommand from "@/commandParser.js";

export default {
  name: "ShellContainer",
  components: {
    HistoryContent,
    InputLine
  },
  data() {
    return {
      historyText: "",
    }
  },
  methods: {
    executeCommand(shellPrompt, command) {
      this.historyText += `${shellPrompt}${command}\n`;
      this.historyText += parseCommand(command) + "\n";
    },
    interruptCommand(shellPrompt, command) {
      this.historyText += `${shellPrompt}${command}^C\n`;
    },
    handleKeydown() {
      if (event.key.toLowerCase() === "l" && event.ctrlKey) {
        event.preventDefault();
        this.historyText = "";
      }
    }
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