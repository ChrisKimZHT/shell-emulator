<template>
  <div class="input-line" id="input-line">
    <span class="shell-prompt">{{ getShellPrompt() }}</span>
    <span class="input-area" ref="inputArea" contenteditable="true" @input="updateCommand">
      {{ currentCommand }}
    </span>
    <span class="hint-area"> {{ currentHint }}</span>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus.js";
import { getHint } from "@/utils/executor.js";

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
      currentHint: "",
      historyCommands: [],
      curHistoryIndex: 0,
    }
  },
  methods: {
    getFocus() {
      this.$refs.inputArea.focus()
    },
    moveCursorToEnd() {
      const el = this.$refs.inputArea;
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
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
      this.curHistoryIndex = this.historyCommands.length;
      this.currentHint = getHint(this.currentDir, this.currentCommand);
    },
    confirmHint() {
      this.currentCommand += this.currentHint;
      this.currentHint = "";
      this.$nextTick(() => {
        this.moveCursorToEnd();
      });
    },
    finishedInput() {
      this.$emit("finished-input", this.getShellPrompt(), this.currentCommand);
      this.historyCommands.push(this.currentCommand);
      this.curHistoryIndex = this.historyCommands.length;
      this.currentCommand = "";
    },
    interruptInput() {
      this.$emit("interrupt-input", this.getShellPrompt(), this.currentCommand);
      this.currentCommand = "";
    },
    onPrevHistory() {
      if (this.curHistoryIndex > 0) {
        this.curHistoryIndex--;
        this.currentCommand = this.historyCommands[this.curHistoryIndex];
      }
      this.$nextTick(() => {
        this.moveCursorToEnd();
      });
    },
    onNextHistory() {
      if (this.curHistoryIndex < this.historyCommands.length - 1) {
        this.curHistoryIndex++;
        this.currentCommand = this.historyCommands[this.curHistoryIndex];
      } else {
        this.curHistoryIndex = this.historyCommands.length;
        this.currentCommand = "";
      }
      this.$nextTick(() => {
        this.moveCursorToEnd();
      });
    }
  },
  mounted() {
    eventBus.on("key-down", this.getFocus);
    eventBus.on("ctrl-c", this.interruptInput);
    eventBus.on("enter", this.finishedInput);
    eventBus.on("arrow-up", this.onPrevHistory);
    eventBus.on("arrow-down", this.onNextHistory);
    eventBus.on("tab", this.confirmHint);
  },
  unmounted() {
    eventBus.off("key-down", this.getFocus);
    eventBus.off("ctrl-c", this.interruptInput);
    eventBus.off("enter", this.finishedInput);
    eventBus.off("arrow-up", this.onPrevHistory);
    eventBus.off("arrow-down", this.onNextHistory);
    eventBus.off("tab", this.confirmHint);
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

.hint-area {
  opacity: 0.3;
}
</style>