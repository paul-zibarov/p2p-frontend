import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import Web3 from "web3";
import { Web3ReactProvider, }  from "@web3-react/core";
import { MetaMaskProvider } from "./hooks/metamask";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { ModalProvider } from "./hooks/modals";
import { StyledEngineProvider } from '@mui/material/styles';

const getLibrary: (provider?: any, connector?: AbstractConnector | undefined) => Web3 = (provider, connector) => {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <StyledEngineProvider injectFirst>
        <MetaMaskProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </MetaMaskProvider>
      </StyledEngineProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);