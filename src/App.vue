<template>
  <ShellContainer />
  <SoftKeyBoard v-if="isMobile" />
</template>

<script>
import ShellContainer from "@/components/ShellContainer.vue";
import eventBus from "@/utils/eventBus.js";
import SoftKeyBoard from "@/components/SoftKeyBoard.vue";
import initUptime from "./utils/initUptime";
import checkDesktop from "./utils/checkDesktop";

export default {
  name: "App",
  components: {
    ShellContainer,
    SoftKeyBoard
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
    // 鼠标点击和触摸屏点击都会触发click，但是过滤掉了桌面端的点击
    onClick(event) {
      if (!checkDesktop()) {
        eventBus.emit("touch");
      }
    },
  },
  data() {
    return {
      isMobile: !checkDesktop(),      
    };
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("click", this.onClick);
    initUptime();
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("click", this.onClick);
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
 