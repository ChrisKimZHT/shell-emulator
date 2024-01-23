<template>
  <ShellContainer />
</template>

<script>
import ShellContainer from "@/components/ShellContainer.vue";
import eventBus from "@/utils/eventBus.js";
import initUptime from "./utils/initUptime";
import checkDesktop from "./utils/checkDesktop";

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
    onTouch(event) {
      if (!checkDesktop()) {
        eventBus.emit("touch");
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("click", this.onTouch);
    initUptime();
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("click", this.onTouch);
  },
}
</script>


<style>
#app {
  font-family: Courier New, Consolas, monospace !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #fff;
  min-height: 100vh;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
}

::selection {
  background-color: #000;
  color: #fff;
}

a {
  color: #000;
  text-decoration: underline #ddd;
}

a:hover {
  color: #000;
  text-decoration: underline #ddd;
  background-color: #ddd;
}
</style>
 