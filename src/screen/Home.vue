<script setup>
import { onMounted, reactive, ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";

let isSharingEnabled = ref(false);
let isMuteVideo = ref(false);

const localVideo = ref(null);
const localVideoStream = ref(null);

let options = reactive({
  // Pass your App ID here.
  appId: "",
  // Set the channel name.
  channel: "",
  // Pass your temp token here.
  token: "",
  // Set the user ID.
  uid: 0,
});

let channelParameters = reactive({
  // A variable to hold a local audio track.
  screenTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  remoteUid: null,
});

async function initializeLocalVideoTrack() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    channelParameters.localVideoTrack = AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: mediaStream.getVideoTracks()[0],
    });

    localVideoStream.value = mediaStream;
    localVideo.value.srcObject = mediaStream;
  } catch (error) {
    console.error("Error accessing the camera:", error);
  }
}

onMounted(() => {
  initializeLocalVideoTrack();
});

const handleClick = async () => {
  if (!isSharingEnabled.value) {
    // Create a screen track for screen sharing.
    channelParameters.screenTrack = await AgoraRTC.createScreenVideoTrack();
    // Replace the video track with the screen track.
    await channelParameters.localVideoTrack.replaceTrack(
      channelParameters.screenTrack?.getMediaStreamTrack(),
      true
    );

    localVideo.value.srcObject = new MediaStream([
      channelParameters.screenTrack?.getMediaStreamTrack(),
    ]);
    // Update the button text.
    document.getElementById("inItScreen").innerHTML = "Stop Sharing";
    // Update the screen sharing state.
    isSharingEnabled.value = true;
  } else {
    // Replace the screen track with the local video track.
    await channelParameters.screenTrack.replaceTrack(
      channelParameters.localVideoTrack,
      true
    );
    // Update the button text.
    document.getElementById("inItScreen").innerHTML = "Share Screen";
    // Update the screen sharing state.
    isSharingEnabled.value = false;
  }
};
</script>
<template>
  <div>
    <video
      ref="localVideo"
      autoplay
      style="height: 200px; width: 200px"
    ></video>
    <button type="button" id="inItScreen" @click="handleClick">
      Share Screen
    </button>
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
