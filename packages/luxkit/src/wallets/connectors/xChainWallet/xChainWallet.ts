import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

// X-Chain wallet with Corona signature support
export const xChainWallet = (): WalletResult => {
  const provider = getWalletProvider("isXChain");
  const installed = !!provider;

  // Extend provider with Corona ZK signature capabilities
  if (provider && !provider._coronaEnabled) {
    provider._coronaEnabled = true;
    
    // Add Corona signature method
    provider.coronaSign = async (message: string, options?: any) => {
      // Generate zero-knowledge proof for the signature
      const zkProof = await provider.request({
        method: 'corona_generateProof',
        params: [message, options]
      });
      
      return {
        signature: await provider.request({
          method: 'personal_sign',
          params: [message, provider.selectedAddress]
        }),
        zkProof,
        proofType: 'corona-v1'
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
      coronaSignatures: true,
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