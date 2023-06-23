<script setup>
import { ref } from "vue";

const hover = ref(false);
</script>
<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="otherOptionContainer"
    :style="{
      'background-color': hover ? '#1a73e84d' : 'transparent',
      color: hover ? '#174ea6' : '#1a73e8',
    }"
  >
    <h3 class="flex items-center gap-3"><slot></slot></h3>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .otherOptionContainer {
    @apply p-2 rounded flex justify-center;
    font-family: "Roboto";
  }
}
</style>
