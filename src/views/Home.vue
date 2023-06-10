<script setup>
import { onMounted, reactive, ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

let isSharingEnabled = ref(false);
let isMuteVideo = ref(false);

const localVideo = ref(null);
const localVideoStream = ref(null);

const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let options = reactive({
  // Pass your App ID here.
  appId: "e9b38caaab77438fa64316dad3bbda81",
  // Set the channel name.
  channel: "first-channel",
  // Pass your temp token here.
  token:
    "006e9b38caaab77438fa64316dad3bbda81IABs2KhUF6Xg5Zhrq6B36YviKqWfgVlILa7wzWJo6+omAVZ0AF8AAAAAEADrUaUDYK2FZAEAAQDwaYRk",
  // Set the user ID.
  uid: 0,
  ExpireTime: 3600,
  // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
  serverUrl: "https://agora-token-service-production-ee00.up.railway.app",
});

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

const handleJoinChannel = async () => {
  // Join a channel.
  await agoraEngine.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );
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
  agoraEngine.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event.
    await agoraEngine.subscribe(user, mediaType);

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
  FetchToken().then((token) => {
    options.token = token;
  });
  agoraEngine.on("token-privilege-will-expire", async function () {
    options.token = await FetchToken();
    await agoraEngine.renewToken(options.token);
  });
});

const handleClick = async () => {
  if (!isSharingEnabled.value) {
    await agoraEngine.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
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
    <input type="number" @input="options.uid = +$event.target.value" />
    <button @click="handleJoinChannel">Join Call</button>
  </div>
</template>

<style scoped></style>
