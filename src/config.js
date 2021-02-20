const iceConfig = {
  iceServers: [{
      urls: "stun:stun.l.google.com:19302"
    }, {
      urls: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
      credential: "muazkh"
  }],
  sdpSemantics: "unified-plan"
};

// export const peerConfig = {
//   host: window.location.hostname,
//   port: 9000,
//   config: iceConfig,
//   path: '/web-phone',
//   debug: 2
// };

export const peerConfig = {
  config: iceConfig
};

// export const keys = {
//   left: "ArrowLeft",
//   right: "ArrowRight"
// };

export const keys = {
  left: "SoftLeft",
  right: "SoftRight"
};
