## Audio Call via WebRTC

Based on [kaios-web-phone](https://github.com/iurii-kyrylenko/kaios-web-phone):

Soft keys support only KaiOS devices. To interact with other devices we also attach mouse click handlers to the softkey panel.

#### Create an empty npm project for local peer server:
```json
{
  "name": "peerjs-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "peerjs --port 9000 --path /web-phone --allow_discovery"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "peer": "^0.6.1"
  }
}
```

#### Start peer server:
- `npm start`

#### Get peer list:
- `http://127.0.0.1:9000/web-phone/peerjs/peers`

#### Run application in dev mode:
- `yarn start`

#### Deploy app to Github web pages:
1. Edit file `src/config.js`
2. Build `yarn build`
3. Deploy `yarn deploy`

---

⚠️  Audio streams go directly between phones. But we also need a signalling server. Prebuilt code currently works with a free [PeerServer Cloud service](https://peerjs.com/peerserver.html). Please be aware that you will be sharing it with other people and IDs may collide.

---

## Usage

The conversation can be established by you or by your contact:
1. To receive a call, you provide only your ID and wait for conversation. Conversation begins when somebody calls you.
2. To begin a conversation, you enter two IDs (yours and contact's) and perform a call.

Application has three screens:
1. **Registration**:
  - to provide your ID and enter the listening state.
2. **Listening**:
  - to wait for incoming call;
  - or to start conversation with your contact.
3. **Conversation**:
  - to talk with the contact.

---

**During registration, you will get a message**:
```
Would you like to share your camera and microphone with KaiOS Web Phone?
```
**Please, allow sharing!**

---

### Example: Alex call Alice.

| Alex          | Alice         |
| ------------- | ------------- |
| Alex enters the application:|
|![01-registration](examples/01-registration.png)|
| Alex inputs his ID:|
|![02-registration](examples/02-registration.png)
| Alex presses **Join**:|
|![03-listening](examples/03-listening.png)|
| Alex inputs Alice's ID:|
|![04-listening](examples/04-listening.png)|
| Alex presses **Call**:|
|![05-listening](examples/05-listening.png)|
| Alex remains listening,</br>because Alice has not registered yet:|
|![06-listening](examples/06-listening.png)|
||Alice registers:|
||![08-listening](examples/08-listening.png)|
| Alex presses the **Call** again<br/>after Alice has registered.<br/>Alex can talk to Alice:|Alice can talk to Alex:|
|![09-conversation](examples/09-conversation.png)|![10-conversation](examples/10-conversation.png)|
