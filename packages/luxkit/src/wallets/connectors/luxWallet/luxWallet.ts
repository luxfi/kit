import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const luxWallet = (): WalletResult => {
  const provider = getWalletProvider("isLux");
  const installed = !!provider;

  return {
    id: "lux",
    name: "Lux Wallet",
    rdns: "io.lux",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/lux-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "lux",
                name: "Lux Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};
