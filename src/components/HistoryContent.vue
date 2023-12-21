<template>
  <span class="history-content">{{ historyText }}</span>
</template>

<script>
export default {
  name: "HistoryContent",
  props: [
    "historyText"
  ]
}
</script>

<style scoped>
.history-content {
  white-space: pre;
}
</style>