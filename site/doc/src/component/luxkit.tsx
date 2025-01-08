"use client";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import * as React from "react";
import { createModal, getDefaultConfig } from "luxkit";
import { createClient } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig(
  getDefaultConfig({
    projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    appName: "LuxKit",
    appLogo: "/logo-blue.svg",
    chains: [mainnet],
    client({ chain }) {
      // @ts-expect-error
      return createClient({ chain, transport: http() });
    },
  })
);

const queryClient = new QueryClient();

export const LuxKitContext = React.createContext<
  ReturnType<typeof createModal>
>({} as any);

export function Providers({ children }: { children: React.ReactNode }) {
  const [kit, setKit] = React.useState<ReturnType<typeof createModal>>();
  const initRef = React.useRef<Boolean>(false);
  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const luxKit = createModal({
        wagmi: config,
      });
      setKit(luxKit);
    }
  }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {kit && (
          <LuxKitContext.Provider value={kit}>
            {children}
          </LuxKitContext.Provider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
