<template>
  <span class="history-content">{{ historyContent }}</span>
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
}
</style>