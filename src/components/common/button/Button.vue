<script setup></script>

<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .button {
    @apply h-14 px-7 font-medium flex justify-center items-center text-white cursor-pointer;
    background-color: #1a73e8;
    border-radius: 2rem;
  }
}
</style>
