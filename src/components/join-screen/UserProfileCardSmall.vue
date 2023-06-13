<script setup>
import Text from "../common/text/Text.vue";
</script>
<template>
  <div class="navigationContainer">
    <div class="textContainer">
      <Text class="text">apanisile@punch.cool</Text>
      <Text class="text">Switch account</Text>
    </div>
    <div class="imageContainer">
      <img
        src="https://lh3.googleusercontent.com/a/AAcHTtdl0XN8pN9DGXu3ofYeInGYNc8KoRdTubabEkj8=s192-c-mo"
        class="image"
      />
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .navigationContainer {
    @apply flex items-center gap-3;
  }
  .textContainer {
    @apply text-right;
  }
  .text {
    @apply leading-4;
  }
  .imageContainer {
    @apply h-9 w-9;
  }
  .image {
    @apply w-full h-full rounded-full;
  }
}
</style>
