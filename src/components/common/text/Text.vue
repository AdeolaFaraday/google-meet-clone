<script setup>
defineProps({
  style: {
    type: Object,
  },
});
</script>
<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<style scoped></style>
