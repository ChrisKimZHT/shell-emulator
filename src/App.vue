<template>
  <ShellContainer />
</template>

<script>
import ShellContainer from "@/components/ShellContainer.vue";
import eventBus from "@/utils/eventBus.js";
import initUptime from "./utils/initUptime";

export default {
  name: "App",
  components: {
    ShellContainer,
  },
  methods: {
    onKeyDown(event) {
      eventBus.emit("key-down");
      if (event.key === "Enter") {
        event?.preventDefault();
        eventBus.emit("enter");
      } else if (event.key.toLowerCase() === "c" && event.ctrlKey) {
        event?.preventDefault();
        eventBus.emit("ctrl-c");
      } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
        event?.preventDefault();
        eventBus.emit("ctrl-l");
      } else if (event.key === "ArrowUp") {
        event?.preventDefault();
        eventBus.emit("arrow-up");
      } else if (event.key === "ArrowDown") {
        event?.preventDefault();
        eventBus.emit("arrow-down");
      } else if (event.key === "Tab") {
        event?.preventDefault();
        eventBus.emit("tab");
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    initUptime();
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
}
</script>


<style>
#app {
  font-family: Courier New, Consolas, monospace !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #000;
  color: #fff;
}
</style>
 