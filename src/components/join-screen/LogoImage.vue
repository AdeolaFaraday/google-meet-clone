<script setup>
import Text from "../common/text/Text.vue";
</script>
<template>
  <div class="logo">
    <img src="../../assets/meet.png" class="image" />
    <Text class="text">Meet</Text>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .image {
    @apply h-10;
  }
  .logo {
    @apply flex items-center gap-3 w-24;
  }
  .text {
    @apply text-2xl;
  }
}
</style>
