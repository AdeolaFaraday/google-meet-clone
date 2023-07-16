<script setup>
import AgoraRTC from "agora-rtc-sdk-ng";
import { onMounted, reactive, ref } from "vue";
import Button from "../common/button/Button.vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { agoraEngineGlobal } from "../../api/users/agora";
import Text from "../common/text/Text.vue";

let isSharingEnabled = ref(false);
let isMuteVideo = ref(false);

const localVideo = ref(null);
const localVideoStream = ref(null);

const agoraEngine = agoraEngineGlobal;

let channelParameters = reactive({
  // A variable to hold a local audio track.
  screenTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  remoteUid: null,
});

let options = reactive({
  // Pass your App ID here.
  appId: "e9b38caaab77438fa64316dad3bbda81",
  // Set the channel name.
  channel: "first-channel",
  // Pass your temp token here.
  token:
    "006e9b38caaab77438fa64316dad3bbda81IAAlzhl9ZppG1S7EFhcyHNXhNrcngx4Ly4XrUEF9T1i7o1Z0AF8AAAAAEAAs2LEFKeOzZAEAAQC5n7Jk",
  // Set the user ID.
  uid: 0,
  ExpireTime: 3600,
  // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
  serverUrl: "https://agora-token-service-production-ee00.up.railway.app",
});

const initializeLocalVideoTrack = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const stream = mediaStream.getVideoTracks()[0];

    stream.enabled = false;

    channelParameters.localVideoTrack = AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: stream,
    });

    stream.stop();

    localVideoStream.value = mediaStream;
    localVideo.value.srcObject = mediaStream;
  } catch (error) {
    console.error("Error accessing the camera:", error);
  }
};

const FetchToken = async () => {
  return new Promise(function (resolve) {
    axios
      .get(
        options.serverUrl +
          "/rtc/" +
          options.channel +
          "/1/uid/" +
          options.uid +
          "/?expiry=" +
          options.ExpireTime
      )
      .then((response) => {
        console.log(response.data.rtcToken);
        resolve(response.data.rtcToken);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

onMounted(() => {
  initializeLocalVideoTrack();
  agoraEngine.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event.
    await agoraEngine.subscribe(user, mediaType);

    console.log("got hereeeeeee", { video: user.videoTrack });

    if (mediaType == "video") {
      // Retrieve the remote video track.
      localVideo.value.srcObject = new MediaStream([
        user.videoTrack?.getMediaStreamTrack(),
      ]);
      channelParameters.remoteVideoTrack = user.videoTrack;
      // Retrieve the remote audio track.
      channelParameters.remoteAudioTrack = user.audioTrack;
      // Save the remote user id for reuse.
      channelParameters.remoteUid = user.uid.toString();
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      // remotePlayerContainer.id = user.uid.toString();
      channelParameters.remoteUid = user.uid.toString();
      // remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
      // Append the remote container to the page body.
      // document.body.append(remotePlayerContainer);
      // Play the remote video track.
      // channelParameters.remoteVideoTrack.play(remotePlayerContainer);
    }
  });
  const storedUid = localStorage.getItem("uId");
  if (storedUid) {
    options.uid = storedUid;
  } else {
    localStorage.setItem("uId", uuidv4().split("-").join(""));
  }
  FetchToken().then((token) => {
    options.token = token;
  });
  // agoraEngine.on("token-privilege-will-expire", async function () {
  //   options.token = await FetchToken();
  //   await agoraEngine.renewToken(options.token);
  // });
});

const handleClick = async () => {
  if (!isSharingEnabled.value) {
    // await agoraEngine.join(
    //   options.appId,
    //   options.channel,
    //   options.token,
    //   options.uid
    // );
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

    await agoraEngine.publish([channelParameters.screenTrack]);
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
  <div class="screenContainer">
    <div class="videoContainer">
      <video ref="localVideo" autoplay class="userVideoScreen"></video>
    </div>
    <div class="profileContainer">
      <div class="avatarContainer">
        <Text class="avatarText">A</Text>
      </div>
    </div>
    <Button
      class="shareBtn"
      variant="primary"
      id="inItScreen"
      @click="handleClick"
      >Share Screen</Button
    >
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .screenContainer {
    @apply h-screen w-screen flex items-center justify-center gap-5;
    /* background-color: red; */
  }
  .videoContainer {
    @apply w-3/5 h-3/4 rounded-lg;
  }
  .userVideoScreen {
    @apply h-full w-full object-contain rounded-lg;
    background-color: black;
  }
  .profileContainer {
    @apply w-1/3 h-3/5 rounded-lg flex justify-center items-center;
    background-color: #3c4043;
  }
  .avatarContainer {
    @apply w-36	h-36 rounded-full flex items-center justify-center;
    background-color: #c5221f;
  }
  .avatarText {
    @apply text-7xl text-white;
  }
  .shareBtn {
    @apply absolute bottom-5;
    left: 45%;
  }
}
</style>
