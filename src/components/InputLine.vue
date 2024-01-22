<template>
  <div class="input-line" id="input-line">
    <span class="shell-prompt">{{ getShellPrompt() }}</span>
    <span class="input-area" ref="inputArea" contenteditable="true" @input="updateCommand">
      {{ currentCommand }}
    </span>
    <span class="hint-area"> {{ displayHint }}</span>
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
      currentHint: [],
      displayHint: "",
      hintTabCount: 0,
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
      this.updateHint();
    },
    updateHint() {
      this.hintTabCount = 0;
      this.currentHint = [];
      this.displayHint = "";
      if (this.currentCommand.length === 0) {
        return;
      }
      const hints = getHint(this.currentDir, this.currentCommand);
      if (hints.length !== 0) {
        this.displayHint = hints.at(0);
      }
      for (let i = 0; i < hints.length; i++) {
        const tmp = this.currentCommand.split(" ");
        hints[i] = tmp[tmp.length - 1] + hints[i];
      }
      this.currentHint = hints;
    },
    confirmHint() {
      if (this.currentHint.length === 0) {
        // do nothing
      } else if (this.currentHint.length === 1) {
        this.currentCommand += this.displayHint;
        this.updateHint();
        this.$nextTick(() => {
          this.moveCursorToEnd();
        });
      } else {
        if (this.hintTabCount === 0) {
          this.hintTabCount++;
        } else {
          this.$emit("re-input", this.getShellPrompt(), this.escapeHtml(this.currentCommand), this.currentHint.join("\t"));
        }
      }
    },
    finishedInput() {
      this.$emit("finished-input", this.getShellPrompt(), this.escapeHtml(this.currentCommand));
      this.historyCommands.push(this.currentCommand);
      this.curHistoryIndex = this.historyCommands.length;
      this.currentCommand = "";
      this.updateHint();
    },
    interruptInput() {
      this.$emit("interrupt-input", this.getShellPrompt(), this.escapeHtml(this.currentCommand));
      this.currentCommand = "";
      this.updateHint();
    },
    onPrevHistory() {
      if (this.curHistoryIndex > 0) {
        this.curHistoryIndex--;
        this.currentCommand = this.historyCommands[this.curHistoryIndex];
      }
      this.$nextTick(() => {
        this.moveCursorToEnd();
      });
      this.updateHint();
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
      this.updateHint();
    },
    escapeHtml(text) {
      const map = {
        '<': '&lt;',
        '>': '&gt;',
      };
      return text.replace(/[<>]/g, function (m) {
        return map[m];
      });
    },
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
.input-line {
  line-height: 23px;
  font-size: 17px;
}

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