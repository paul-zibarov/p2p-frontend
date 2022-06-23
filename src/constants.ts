import { erc20ABI, erc721ABI, erc1155ABI, p2pABI } from './abis'

export const apiURL = 'https://nft-p2p-backend.herokuapp.com'

export const contractsData = {
    t20: {
        address: "0xD44348AEeA736DFC368C51F6FD1805cB6E111AF0",
        abi: erc20ABI
    },
    t721: {
        address: "0xC7cd77CCF59b7D9dd38E231afafF48AC0e331916",
        abi: erc721ABI 
    },
    t1155: {
        address: "0xD128aFe7e7ccFcc6121cc071d342e886B23A5cF9",
        abi: erc1155ABI 
    },
    p2p: {
        address: "0xB5638c4b76325f4E95fa84A39BA0Fa2828457B35",
        abi: p2pABI 
    }
};

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

export const tradeDeadline = '2000000000';

