<script setup>
import { reactive } from "vue";
import IconCall from "../icons/IconCall.vue";
import IconCamera from "../icons/IconCamera.vue";
import IconEmoji from "../icons/IconEmoji.vue";
import IconHand from "../icons/IconHand.vue";
import IconMic from "../icons/IconMic.vue";
import IconOptions from "../icons/IconOptions.vue";
import IconUpload from "../icons/IconUpload.vue";

const emit = defineEmits(["shareScreen"]);

let iconState = reactive({
  clickedIconIndex: null,
});

const icons = [
  IconMic,
  IconCamera,
  IconEmoji,
  IconUpload,
  IconHand,
  IconOptions,
  IconCall,
];

const iconClick = (icon, index) => {
  if (icon === IconUpload) {
    emit("shareScreen");
  }
  iconState.clickedIconIndex = index;
};
</script>

<template>
  <div class="callActionContainer">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="callActionIcon"
      :style="{
        background:
          iconState.clickedIconIndex === index ? '#c5221f' : '#3c4043',
      }"
    >
      <component
        :is="icon"
        @click="iconClick(icon, index)"
        style="color: #fff"
      />
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .callActionContainer {
    @apply flex justify-center items-center absolute bottom-5 gap-5;
  }
  .callActionIcon {
    @apply h-10 w-10 rounded-full flex justify-center items-center cursor-pointer;
  }
}
</style>
