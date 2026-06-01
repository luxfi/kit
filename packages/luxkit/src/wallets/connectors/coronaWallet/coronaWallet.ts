import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const coronaWallet = (): WalletResult => {
  const provider = getWalletProvider("isCorona");
  const installed = !!provider;

  return {
    id: "corona",
    name: "Corona Wallet",
    rdns: "io.lux.corona",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/corona-wallet/placeholder",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "corona",
                name: "Corona Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};