<script setup>
import { RouterView } from "vue-router";
import AgoraRTC from "agora-rtc-sdk-ng";

AgoraRTC.onAutoplayFailed = () => {
  // Create button for the user interaction.
  const btn = document.createElement("button");
  // Set the button text.
  btn.innerText = "Click me to resume the audio/video playback";
  // Remove the button when onClick event occurs.
  btn.onClick = () => {
    btn.remove();
  };
  // Append the button to the UI.
  document.body.append(btn);
};
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

<!-- https://docs.agora.io/en/video-calling/develop/product-workflow?platform=web -->
