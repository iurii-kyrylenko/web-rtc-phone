import Peer from "peerjs";
import { peerConfig } from "./config";

const WAIT_FOR_ANSWER_MS = 5000;

let peer = null;
let localStream = null;
let callAnswered = false;

export function createPeer(code, cb) {
  peer = new Peer(code, peerConfig);

  peer.on("open", id => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(stream => localStream = stream)
      .then(() => callAnswered = false)
      .then(() => cb.open(id))
      .catch(err => cb(err));
  });

  peer.on("close", () => {
    localStream && localStream.getTracks().forEach(t => t.stop());
    cb.close();
  });

  peer.on("error", err => cb.error(err));

  peer.on("call", mediaConnection => {
    // Remote peer answers to only one call
    if (callAnswered) {
      return;
    }

    callAnswered = true;

    mediaConnection.answer(localStream);
    const rmCode = mediaConnection.peer;
    mediaConnection.on("stream", stream => cb.stream(stream, rmCode));
  });
}

export function destroyPeer() {
  peer.destroy();
}

export function callPear(rmCode, cb) {
  const mediaConnection = peer.call(rmCode, localStream);

  // Wait for remote stream
  const timeout = setTimeout(
    () => !mediaConnection.open && cb.timeout(),
    WAIT_FOR_ANSWER_MS
  );

  mediaConnection.on("stream", stream => {
    clearTimeout(timeout);
    cb.stream(stream);
  });
}
