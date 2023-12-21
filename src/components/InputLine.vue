<template>
  <div class="input-line">
    <span class="shell-prompt">{{ getShellPrompt() }}</span>
    <span class="input-area" ref="input-area" contenteditable="true" @input="updateCommand">
      {{ currentCommand }}
    </span>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus.js";

export default {
  name: "InputLine",
  props: [
    "promptUser",
    "promptHost",
    "currentDir",
  ],
  data() {
    return {
      currentCommand: "",
    }
  },
  methods: {
    getFocus() {
      this.$refs["input-area"].focus()
    },
    getShellPrompt() {
      let promptDir = "";
      if (this.currentDir === "/home/chriskim") {
        promptDir = "~";
      } else {
        const tmp = this.currentDir.split("/").pop();
        promptDir = tmp.length > 0 ? tmp : "/";
      }
      return `[${this.promptUser}@${this.promptHost} ${promptDir}]$ `;
    },
    updateCommand(event) {
      this.currentCommand = event.target.innerText;
    },
    finishedInput() {
      this.$emit("finished-input", this.getShellPrompt(), this.currentCommand);
      this.currentCommand = "";
    },
    interruptInput() {
      this.$emit("interrupt-input", this.getShellPrompt(), this.currentCommand);
      this.currentCommand = "";
    },
  },
  mounted() {
    eventBus.on("key-down", this.getFocus)
    eventBus.on("ctrl-c", this.interruptInput);
    eventBus.on("enter", this.finishedInput);
  },
  unmounted() {
    eventBus.off("key-down", this.getFocus)
    eventBus.off("ctrl-c", this.interruptInput);
    eventBus.off("enter", this.finishedInput);
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