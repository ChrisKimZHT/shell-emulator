<template>
  <div class="input-line">
    <span class="shell-prompt">{{ shellPrompt }}</span>
    <span class="input-area" ref="input-area" contenteditable="true" @input="updateCommand">
      {{ currentCommand }}
    </span>
  </div>
</template>

<script>
export default {
  name: "InputLine",
  props: [
    "promptUser",
    "promptHost",
    "promptPath",
  ],
  data() {
    return {
      shellPrompt: `[${this.promptUser}@${this.promptHost} ${this.promptPath}]$ `,
      currentCommand: "",
      historyCommands: [],
      selectedHistoryCommandIndex: 0
    };
  },
  methods: {
    updateCommand() {
      this.currentCommand = event.target.innerText;
      this.selectedHistoryCommandIndex = this.historyCommands.length;
    },
    submitCommand() {
      this.$emit("submit-command", this.shellPrompt, this.currentCommand);
      if (this.currentCommand.trim().length > 0) {
        this.historyCommands.push(this.currentCommand);
        this.selectedHistoryCommandIndex = this.historyCommands.length;
      }
      this.currentCommand = "";
    },
    interruptCommand() {
      this.$emit("interrupt-command", this.shellPrompt, this.currentCommand);
      this.currentCommand = "";
    },
    getFocus() {
      this.$refs["input-area"].focus();
    },
    handleKeydown() {
      this.getFocus();
      if (event.key === "Enter") { // Enter
        event.preventDefault();
        this.submitCommand();
      } else if (event.key.toLowerCase() === "c" && event.ctrlKey) { // Ctrl + C
        this.interruptCommand();
      } else if (event.key.toLowerCase() === "l" && event.ctrlKey) { // Ctrl + L
        event.preventDefault();
        this.$emit("clear");
      } else if (event.key === "ArrowUp") { // ArrowUp
        event.preventDefault();
        if (this.selectedHistoryCommandIndex > 0) {
          this.selectedHistoryCommandIndex--;
          this.currentCommand = this.historyCommands[this.selectedHistoryCommandIndex];
        }
      } else if (event.key === "ArrowDown") { // ArrowDown
        event.preventDefault();
        this.selectedHistoryCommandIndex = Math.min(this.selectedHistoryCommandIndex + 1, this.historyCommands.length);
        this.currentCommand = this.selectedHistoryCommandIndex < this.historyCommands.length ? this.historyCommands[this.selectedHistoryCommandIndex] : "";
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
}
</script>

<style scoped>
.shell-prompt {
  white-space: pre;
}

.input-area {
  outline: none;
  word-break: break-all;
}
</style>