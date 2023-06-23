<script setup>
import AgoraRTC from "agora-rtc-sdk-ng";
import Button from "../common/button/Button.vue";
import { reactive } from "vue";
import IconUpload from "../icons/IconUpload.vue";
import router from "../../router";
import OtherJoiningOption from "./OtherJoiningOption.vue";
import IconPhoneCall from "../icons/IconPhoneCall.vue";
import IconComputer from "../icons/IconComputer.vue";

const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let options = reactive({
  // Pass your App ID here.
  appId: "e9b38caaab77438fa64316dad3bbda81",
  // Set the channel name.
  channel: "first-channel",
  // Pass your temp token here.
  token:
    "006e9b38caaab77438fa64316dad3bbda81IABYJPpfZDJYhgnzPr3Yg1xidg2q/f7lRxNADT5E9dlCr1Z0AF8AAAAAEACk9HIB82SXZAEAAQCDIZZk",
  // Set the user ID.
  uid: 0,
  ExpireTime: 3600,
  // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
  serverUrl: "https://agora-token-service-production-ee00.up.railway.app",
});

const handleJoinChannel = async () => {
  // Join a channel.
  await agoraEngine.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );
  router.push("/call");
  // Create a local audio track from the audio sampled by a microphone.
  // channelParameters.localAudioTrack =
  //   await AgoraRTC.createMicrophoneAudioTrack();
  // // Create a local video track from the video captured by a camera.
  // channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  // // Append the local video container to the page body.
  // // document.body.append(localPlayerContainer);
  // // Publish the local audio and video tracks in the channel.
  // await agoraEngine.publish([
  //   channelParameters.localAudioTrack,
  //   channelParameters.localVideoTrack,
  // ]);
  // Play the local video track.
  // channelParameters.localVideoTrack.play(localPlayerContainer);
  console.log("publish success!");
};
</script>
<template>
  <div class="textContent">
    <h1 class="text">Meet - Daily Standup</h1>
    <p class="paragraph">No one is here.</p>
    <div class="btnContainer">
      <Button variant="primary" :onclick="handleJoinChannel">Join now</Button>
      <Button><IconUpload class="sharebtn" /> Present</Button>
    </div>
    <p class="paragraph">Other joining option</p>

    <div class="mt-2">
      <OtherJoiningOption>
        <IconComputer class="h-5 w-5" /> Use Companion mode</OtherJoiningOption
      >
      <OtherJoiningOption
        ><IconPhoneCall class="h-5 w-5" /> Join and use a phone for
        audio</OtherJoiningOption
      >
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .textContent {
    @apply flex items-center justify-center h-full flex-col w-4/5;
    font-family: "Roboto";
  }
  .text {
    @apply text-3xl mb-6;
    /* font-size: 1.75rem; */
    font-weight: 400;
  }
  .paragraph {
    font-weight: 500;
  }
  .btnContainer {
    @apply flex gap-2 mt-6 mb-12;
  }
  .sharebtn {
    @apply h-6 w-6 mr-3;
  }
}
</style>
