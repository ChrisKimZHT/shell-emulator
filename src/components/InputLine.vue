<template>
  <div class="input-line">
    <span class="shell-prompt">{{ shellPrompt }}</span>
    <span class="input-area" ref="input-area" contenteditable="true" @input="updateCommand" @keydown.enter.prevent>
      {{ command }}
    </span>
  </div>
</template>

<script>
export default {
  name: "InputLine",
  props: [
    "user",
    "host",
    "path"
  ],
  data() {
    return {
      shellPrompt: `[${this.user}@${this.host} ${this.path}]$ `,
      command: ""
    };
  },
  methods: {
    updateCommand() {
      this.command = event.target.innerText;
    },
    submitCommand() {
      this.$emit("submit-command", this.shellPrompt, this.command.trimEnd());
      this.command = "";
    },
    interruptCommand() {
      this.$emit("interrupt-command", this.shellPrompt, this.command.trimEnd());
      this.command = "";
    },
    getFocus() {
      this.$refs["input-area"].focus();
    },
    handleKeydown() {
      this.getFocus();
      if (event.key === "Enter") {
        this.submitCommand();
      } else if (event.key.toLowerCase() === "c" && event.ctrlKey) {
        this.interruptCommand();
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("click", this.getFocus);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("click", this.getFocus);
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