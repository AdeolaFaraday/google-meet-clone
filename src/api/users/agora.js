import AgoraRTC from "agora-rtc-sdk-ng";

export const agoraEngineGlobal = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
