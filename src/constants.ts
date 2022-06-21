import { ethers } from "ethers";
import { erc20ABI, erc721ABI, erc1155ABI, p2pABI } from './abis'

const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
const signer = provider.getSigner()

export const contractsData = {
    t20: {
        address: "0x6Ce9E7B9443Bbb4372293306BF03228dD27185F3",
        abi: erc20ABI
    },
    t721: {
        address: "0x1a9135D56454fC7b87181636325225350bdE31F2",
        abi: erc721ABI 
    },
    t1155: {
        address: "0x49bE1cDa55db1aBB1AeD6847fB2da23cc420E5B8",
        abi: erc1155ABI 
    },
    p2p: {
        address: "0x67491f84777144780281Fd9C76253D0a4AdA05D1",
        abi: p2pABI 
    }
};

const p2p = new ethers.Contract(contractsData.p2p.address, contractsData.p2p.abi, signer)
const t20 = new ethers.Contract(contractsData.t20.address, contractsData.t20.abi, signer)
const t721 = new ethers.Contract(contractsData.t721.address, contractsData.t721.abi, signer)
const t1155 = new ethers.Contract(contractsData.t1155.address, contractsData.t1155.abi, signer)

export const contracts = {
    t20,
    t721,
    t1155,
    p2p
}

export const getAssetTypes = () => {
    return [
      'ERC-20',
      'ERC-721',
      'ERC-1155'
    ]
  }

export const getCollections = (type: string) => {
    switch(type) {
      case 'ERC-20':
        return [contractsData.t20.address];
      case 'ERC-721':
        return [contractsData.t721.address];
      case 'ERC-1155':
        return [contractsData.t1155.address];
      default:
        return [];
    }
  }

