<script setup>
import { ref } from "vue";
import IconCircleAnimate from "../../icons/IconCircleAnimate.vue";

const hover = ref(false);
const props = defineProps({
  variant: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
});

const buttonBgColor = props.variant === "primary" ? "#1a73e8" : "#fff";
const textColor = props.variant === "primary" ? "#fff" : "#1a73e8";
const hoverColor = props.variant === "primary" ? "#316ccb" : "#f8f9fa";
const border =
  props.variant === "primary" ? "none" : "1px solid rgb(242, 232, 232)";
</script>

<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="{
      'background-color': hover ? hoverColor : buttonBgColor,
      color: textColor,
      border: border,
    }"
    class="button"
  >
    <slot v-if="!props.loading"></slot>
    <IconCircleAnimate v-else />
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
    box-shadow: -3px 8px 7px -8px rgba(100, 90, 90, 0.84);
  }
}
</style>
