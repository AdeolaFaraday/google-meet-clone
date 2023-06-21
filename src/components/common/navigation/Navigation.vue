<script setup>
import LogoImage from "../../join-screen/LogoImage.vue";
import UserProfileCardSmall from "../../join-screen/UserProfileCardSmall.vue";
</script>
<template>
  <div class="container">
    <LogoImage />
    <UserProfileCardSmall />
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container {
    @apply flex items-center justify-between min-w-full p-5 absolute;
  }
}
</style>
