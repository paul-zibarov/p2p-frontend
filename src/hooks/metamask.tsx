import { useState, useEffect, useMemo, useCallback, useContext, createContext } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../components/Wallet/connectors";

export const MetaMaskContext = createContext<{
  isActive: boolean;
  account: string | null | undefined;
  isLoading: boolean;
  library: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
} | null>(null);

export const MetaMaskProvider = ({ children }: { children: JSX.Element }) => {
  const { activate, account, library, active, deactivate } = useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    connect().then(val => {
        setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log("Connecting to MetaMask Wallet");
    try {
      activate(injected);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log("Deactivating...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      library,
      disconnect,
    }),
    [isActive, isLoading]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export function useMetaMask() {
  const context = useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
