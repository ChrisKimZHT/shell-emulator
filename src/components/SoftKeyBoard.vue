<template>
  <div class="padding"></div>
  <div class="keyboard">
    <div class="key" v-on:click="onTab">TAB</div>
    <div class="div"></div>
    <div class="key" v-on:click="onEnter">Enter</div>
    <div class="div"></div>
    <div class="key" v-on:click="onCtrlC">Ctrl-C</div>
    <div class="div"></div>
    <div class="key" v-on:click="onArrowUp">UP</div>
    <div class="div"></div>
    <div class="key" v-on:click="onArrowDown">DOWN</div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus.js";

export default {
  name: "SoftKeyBoard",
  methods: {
    onTab(event) {
      event.stopPropagation();
      eventBus.emit("tab");
    },
    onEnter(event) {
      event.stopPropagation();
      eventBus.emit("enter");
    },
    onCtrlC(event) {
      event.stopPropagation();
      eventBus.emit("ctrl-c");
    },
    onArrowUp(event) {
      event.stopPropagation();
      eventBus.emit("arrow-up");
    },
    onArrowDown(event) {
      event.stopPropagation();
      eventBus.emit("arrow-down");
    },
  },
}
</script>

<style scoped>
.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(88, 88, 88, 0.5);
  color: #fff;
  text-align: center;
  user-select: none;
}

.key {
  display: inline-block;
  width: calc(20% - 2px);
  padding: 10px 0px;
}

.div {
  display: inline;
  box-sizing: border-box;
  border-left: 2px solid hsla(0, 0%, 100%, 0.6);
}

.padding {
  height: 60px;
  width: 100%;
}
</style>