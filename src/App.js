import { useState, useReducer, useEffect } from "react";
import { Header, InputForm, EmptyForm, Info, Softkeys } from "./components";
import { createPeer, destroyPeer, callPear } from "./peer-service";
import * as u from "./utils";

const App = () => {
  const [audio] = useState(u.getAudio());

  const[state, dispatch] = useReducer(u.reducer, {
    status: "Registration", 
    me: "",
    contact: "",
    message: ""
  });

  useEffect(() =>
    u.refs[state.status].current.focus()
  );

  const handleJoin = id => {
    dispatch({ type: "MESSAGE", data: "Wait, please!" });

    createPeer(id, {
      open(id) {
        dispatch({ type: "LISTEN", data: id });
      },
      close() {
        audio.srcObject = null;
        dispatch({ type: "REGISTER" });
      },
      error(err) {
        dispatch({ type: "MESSAGE", data: err.message });
      },
      stream(remoteStream, rmCode) {
        audio.srcObject = remoteStream;
        dispatch({ type: "CONNECT", data: rmCode });
      }
    })
  };

  const handleConnect = id => {
    if (id === state.me) {
      dispatch({ type: "MESSAGE", data: "Cannot connect to myself" });
      return;
    }

    dispatch({ type: "MESSAGE", data: "Wait, please!" });

    callPear(id, {
      stream(remoteStream) {
        audio.srcObject = remoteStream;
        dispatch({ type: "CONNECT", data: id });
      },
      timeout() {
        dispatch({ type: "MESSAGE", data: `Could not connect to peer ${id}` });
      }
    });
  };

  const handleLeave = () =>  {
    dispatch({ type: "MESSAGE", data:  "" });
    destroyPeer();
  }

  return (
    <>
      <Header title={state.status} />
      <InputForm
        ref={u.refs.Registration}
        label="Me"
        onSubmit={handleJoin}
        isActive={state.status === "Registration"}
        code={state.me}
      />
      <InputForm
        ref={u.refs.Listening}
        label="Contact"
        onSubmit={handleConnect}
        onSoftLeft={handleLeave}
        isActive={state.status === "Listening"}
        code={state.contact}
      />
      <EmptyForm
        ref={u.refs.Conversation}
        onSubmit={handleLeave}
      />
      <Info text={u.getInfo(state.status)} />
      <Info text={state.message} isMessage={true} />
      <Softkeys
        {...u.getSoftKeyProps(state.status)}
        target={u.refs[state.status]}
      />
    </>
  );
}

export default App;
