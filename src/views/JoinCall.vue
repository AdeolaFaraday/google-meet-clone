<script setup>
import Navigation from "../components/common/navigation/Navigation.vue";
import VideoComponent from "../components/join-screen/VideoComponent.vue";
</script>

<template>
  <div>
    <Navigation />
    <div class="actionContainer">
      <VideoComponent />
      <div class="textContainer"></div>
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .textContainer {
    @apply h-full;
    flex: 2;
  }
  .actionContainer {
    @apply flex items-center;
    height: 100vh;
  }
}
</style>
