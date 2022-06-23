import { useState } from 'react';
import { MenuItem, Box, TextField } from '@mui/material';
import { BigNumber } from 'ethers';

import { getAssetTypes, getCollections } from '../../constants';
import { useMetaMask } from '../../hooks/metamask';
import { useContracts } from '../../hooks/contracts';
import { Asset } from '../../types/Asset';
import './styles.css';

export function SelectAsset(props: { title: string, update: (data: Asset) => void }) {
  const [collections, setCollections] = useState(['']);
  const [tokens, setTokens] = useState(['']);

  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedAssetAddress, setSelectedAssetAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedAssetAmount, setSelectedAssetAmount] = useState('');

  const { account } = useMetaMask() ?? {};
  const { t721 } = useContracts();

  const changeAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedAsset(e.target.value)
      setCollections(getCollections(e.target.value))
      setTokens([''])
      setSelectedAssetAddress('')
      props.update({
        type: e.target.value,
        address: selectedAssetAddress,
        tokenId: selectedToken,
        amount: selectedAssetAmount
      } )
    }
  }

  const changeCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedAssetAddress(e.target.value)
      getUserTokens().then((tokens) => {
        setTokens(tokens)
      })
      props.update({
        type: selectedAsset,
        address: e.target.value,
        tokenId: selectedToken,
        amount: selectedAssetAmount
      })
    }
  }
  
  const changeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedToken(e.target.value)
    }
    props.update({
      type: selectedAsset,
      address: selectedAssetAddress,
      tokenId: e.target.value,
      amount: selectedAssetAmount
    })
  }

  const changeAssetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedAssetAmount(e.target.value)
      props.update({
        type: selectedAsset,
        address: selectedAssetAddress,
        tokenId: selectedToken,
        amount: e.target.value
      })
    }
  }

  const getUserTokens = async () => {
    let tokens = await t721?.userTokens(account);
    return tokens.map((e: BigNumber) => { return e.toString() })
  }

  return (
    <Box>
      <TextField  select className='select' value={selectedAsset} label={props.title + ' Asset'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeAsset(e)}}>
          {getAssetTypes().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField>
    { selectedAsset === 'ERC-20' ?
      <Box>
        <TextField  select className='select' value={selectedAssetAddress} label={props.title + ' Asset Address'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeCollection(e)}}>
          {collections.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField className='select' value={selectedAssetAmount} label={props.title + ' Asset Amount'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeAssetAmount(e)}}></TextField>
      </Box>
      : null
    }
    { selectedAsset === 'ERC-721' ?
      <Box>
        <TextField  select className='select' value={selectedAssetAddress} label={props.title + ' Collection Address'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeCollection(e)}}>
          {collections.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        { props.title === 'Proposed' ? 
          <TextField  select className='select' value={selectedToken} label={props.title + ' Asset Tokens'}onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeToken(e)}}>
            {tokens.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField> :
          <TextField className='select' label={props.title + ' Asset Tokens'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeToken(e)}}></TextField>
        }
      </Box>
      : null
    }
    { selectedAsset === 'ERC-1155' ?
      <Box>
        <TextField  select className='select' value={selectedAssetAddress} label={props.title + ' Asset Address'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeCollection(e)}}>
          {collections.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField className='select' value={selectedToken} label={props.title + ' Asset Tokens'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeToken(e)}}></TextField>
        <TextField className='select' value={selectedAssetAmount} label={props.title + ' Asset Amount'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeAssetAmount(e)}}></TextField>
      </Box>
      : null
    }      
    </Box>
  );
}