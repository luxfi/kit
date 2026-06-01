import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

// X-Chain wallet with Ringtail signature support
export const xChainWallet = (): WalletResult => {
  const provider = getWalletProvider("isXChain");
  const installed = !!provider;

  // Extend provider with Ringtail ZK signature capabilities
  if (provider && !provider._ringtailEnabled) {
    provider._ringtailEnabled = true;
    
    // Add Ringtail signature method
    provider.ringtailSign = async (message: string, options?: any) => {
      // Generate zero-knowledge proof for the signature
      const zkProof = await provider.request({
        method: 'ringtail_generateProof',
        params: [message, options]
      });
      
      return {
        signature: await provider.request({
          method: 'personal_sign',
          params: [message, provider.selectedAddress]
        }),
        zkProof,
        proofType: 'ringtail-v1'
      };
    };
    
    // Add cross-chain operation support
    provider.executeXChainOperation = async (operations: any[]) => {
      return provider.request({
        method: 'xchain_execute',
        params: operations
      });
    };
  }

  return {
    id: "xchain",
    name: "X-Chain Wallet",
    rdns: "io.lux.xchain",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/xchain-wallet/placeholder",
    },
    installed,
    features: {
      ringtailSignatures: true,
      crossChainOperations: true,
      zkProofs: true,
    },
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "xchain",
                name: "X-Chain Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};