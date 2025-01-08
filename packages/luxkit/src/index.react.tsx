"use client";
import { createModal } from "./index";
import React, { useEffect, useRef, useState } from "react";
import { useRKStore } from "./store";
import { useConfig } from "wagmi";

const Context: React.Context<ReturnType<typeof createModal> | undefined> =
  React.createContext<ReturnType<typeof createModal> | undefined>(undefined);

export const LuxKitProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const wagmiConfig = useConfig();
  if (React.useContext(Context)) {
    throw new Error(
      "Multiple, nested usages of LuxKitProvider detected. Please use only one."
    );
  }

  if (!wagmiConfig) {
    throw new Error("LuxKitProvider must be mounted inside WagmiConfig");
  }
  const [value, setValue] = useState<
    ReturnType<typeof createModal> | undefined
  >(undefined);

  const luxkitRef = useRef<ReturnType<typeof createModal>>();
  if (!luxkitRef.current && wagmiConfig) {
    luxkitRef.current = createModal({
      wagmi: wagmiConfig,
    });
    setValue(luxkitRef.current);
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useLuxKitModal = () => {
  const value = React.useContext(Context);

  if (!value) {
    throw new Error(
      "useLuxKitModalStatus must be used inside LuxKitProvider"
    );
  }

  return value;
};

export const useLuxKitModalStatus = () => {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error(
      "useLuxKitModalStatus must be used inside LuxKitProvider"
    );
  }
  const [open, setOpen] = useState(useRKStore.getState().open);
  useEffect(
    () =>
      value.subscribeModalState((e) => {
        setOpen(e);
      }),
    [value.subscribeModalState]
  );
  return open;
};
