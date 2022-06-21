import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { contractsData } from './../constants'

export const useContracts = () => {
    const { library } = useWeb3React();

    const contracts = useMemo(() => {
        if(!library) {
           return {}
        }

        let t20 = new library.eth.Contract(contractsData.t20.abi, contractsData.t20.address);
        let t721 = new library.eth.Contract(contractsData.t721.abi, contractsData.t721.address);
        let t1155 = new library.eth.Contract(contractsData.t1155.abi, contractsData.t1155.address);        
        let p2p = new library.eth.Contract(contractsData.p2p.abi, contractsData.p2p.address);

        return {
            t20,
            t721,
            t1155,
            p2p
        }
    }, [library])

    return contracts;
}