<script setup></script>
<template>
  <div>
    <button type="button" id="inItScreen">Share Screen</button>
    <button type="button" id="muteVideo">Mute Video</button>
    <br /><label> Local Audio Level :</label>
    <input
      type="range"
      min="0"
      id="localAudioVolume"
      max="100"
      step="1"
    /><br />
    <label> Remote Audio Level :</label>
    <input type="range" min="0" id="remoteAudioVolume" max="100" step="1" />
  </div>
</template>

<style scoped></style>
