import { createModal, getDefaultConfig } from "luxkit";
import { createConfig } from "wagmi";
import { createClient, http } from "viem";
import { arbitrum, bsc, mainnet, optimism, polygon } from "viem/chains";

const defaultConfig = getDefaultConfig({
  appName: "LuxKit example",
  projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
  chains: [mainnet, arbitrum, bsc, optimism, polygon],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

export const config = createConfig(defaultConfig);

export const luxKit = createModal({
  wagmi: config,
});
