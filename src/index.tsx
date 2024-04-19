/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

window.onload = () => {
  const root = document.getElementById("root");
  render(() => <App />, root!);
};

navigator.serviceWorker.register("/sw.js").then(function () {
  console.log("Service Worker Registered");
});
