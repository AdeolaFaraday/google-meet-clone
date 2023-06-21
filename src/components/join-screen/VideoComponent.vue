<script setup></script>
<template>
  <div class="container">
    <div class="videoContainer"></div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container {
    @apply h-full flex items-center justify-end;
    flex: 3;
  }
  .videoContainer {
    @apply rounded-lg;
    height: 61%;
    width: 88%;
    background-color: rgb(32, 33, 36);
  }
}
</style>
