import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

import woopMp3 from './sounds/woop.mp3';
import musicMp3 from './sounds/music.mp3';
// import woopOgg from './sounds/woop.ogg';

// Init VK  Mini App
bridge.send("VKWebAppInit");

window.woop = () => {
  new Audio(woopMp3).play();
}

window.audioMusic = new Audio(musicMp3);
window.audioMusic.loop = true;

ReactDOM.render(<App />, document.getElementById("root"));
if (false && process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { }); //runtime download
}

