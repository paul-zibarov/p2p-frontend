import { useMemo } from "react";
import { ethers } from "ethers";

import { contractsData } from '../constants'

export const useContracts = () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
    const signer = provider.getSigner()

    const contracts = useMemo(() => {
        if(!provider) {
           return {}
        }

        const p2p = new ethers.Contract(contractsData.p2p.address, contractsData.p2p.abi, signer)
        const t20 = new ethers.Contract(contractsData.t20.address, contractsData.t20.abi, signer)
        const t721 = new ethers.Contract(contractsData.t721.address, contractsData.t721.abi, signer)
        const t1155 = new ethers.Contract(contractsData.t1155.address, contractsData.t1155.abi, signer)

        return {
            t20,
            t721,
            t1155,
            p2p
        }
    }, [provider])

    return contracts;
}