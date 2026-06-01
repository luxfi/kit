import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const ringtailWallet = (): WalletResult => {
  const provider = getWalletProvider("isRingtail");
  const installed = !!provider;

  return {
    id: "ringtail",
    name: "Ringtail Wallet",
    rdns: "io.lux.ringtail",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/ringtail-wallet/placeholder",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "ringtail",
                name: "Ringtail Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};