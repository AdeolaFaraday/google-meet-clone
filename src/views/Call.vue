<script setup>
import ScreenComponent from "../components/call-screen/ScreenComponent.vue";
</script>
<template>
  <div class="screenParent">
    <ScreenComponent />
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .screenParent {
    height: 100vh;
  }
}
</style>
