<template>
  <span class="history-content" v-html="historyContent"></span>
</template>

<script>
export default {
  name: "HistoryLines",
  props: [
    "historyContent"
  ]
}
</script>

<style scoped>
.history-content {
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 23px;
  font-size: 17px;
}
</style>