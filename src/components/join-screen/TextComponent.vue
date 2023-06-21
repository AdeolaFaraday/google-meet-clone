<script setup>
import Button from "../common/button/Button.vue";
</script>
<template>
  <div class="textContent">
    <h1 class="text">Meet - Daily Standup</h1>
    <p class="paragraph">No one is here.</p>
    <div class="btnContainer">
      <Button>Join now</Button>
      <Button>Present</Button>
    </div>
    <p class="paragraph">Other joining option</p>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .textContent {
    @apply flex items-center justify-center h-full flex-col w-4/5;
    font-family: "Roboto";
  }
  .text {
    @apply text-3xl mb-6;
    /* font-size: 1.75rem; */
    font-weight: 400;
  }
  .paragraph {
    font-weight: 500;
  }
  .btnContainer {
    @apply flex gap-2 mt-6 mb-12;
  }
}
</style>
