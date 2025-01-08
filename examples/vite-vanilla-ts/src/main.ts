import "./style.css";
import { disconnect, getAccount, watchAccount } from "@wagmi/core";
import { luxKit, config } from "./luxkit.ts";

function connect() {
  if (getAccount(config).isConnected) {
    disconnect(config);
  } else {
    console.log("connect");
    luxKit.open();
  }
}

const btnEl = document.getElementById("btn");
const userEl = document.getElementById("user");

btnEl?.addEventListener("click", connect);

// listening for account changes
watchAccount(config, {
  onChange(account, prevAccount) {
    if (userEl && btnEl) {
      userEl.innerText = account.address ?? "";
      if (account.isConnected) {
        btnEl.innerText = "Disconnect";
      } else {
        btnEl.innerText = "Connect";
      }
    }
  },
});
