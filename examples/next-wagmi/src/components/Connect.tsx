"use client";

import { BaseError } from "viem";
import { useAccount, useConfig, useConnect, useDisconnect } from "wagmi";
import { useEffect, useRef } from "react";
import { createModal } from "luxkit";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();

  const luxKitRef = useRef<ReturnType<typeof createModal>>();
  const config = useConfig();

  useEffect(() => {
    if (!luxKitRef.current) {
      luxKitRef.current = createModal({
        showWalletConnect: true,
        wagmi: config as any,
        customButtons: [],
      });
    }
  }, [config]);

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        <br />

        <button
          onClick={() => {
            luxKitRef.current?.setTheme("light");
            luxKitRef.current?.open();
          }}
        >
          light mode
        </button>

        <br />

        <button
          onClick={() => {
            luxKitRef.current?.setTheme("dark");
            luxKitRef.current?.open();
          }}
        >
          dark mode
        </button>
        <br />

        {!isConnected && (
          <button onClick={() => luxKitRef.current?.open()}>
            open LuxKit
          </button>
        )}
        <br />

        <button onClick={() => luxKitRef.current?.open({ forceOpen: true })}>
          force open LuxKit
        </button>
        {/* {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))} */}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
