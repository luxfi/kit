import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const bridgeWallet = (): WalletResult => {
  const provider = getWalletProvider("isBridge");
  const installed = !!provider;

  return {
    id: "bridge",
    name: "Bridge Wallet",
    rdns: "io.lux.bridge",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/bridge-wallet/placeholder",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "bridge",
                name: "Bridge Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};