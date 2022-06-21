import { useState } from 'react';
import { MenuItem, Box, TextField } from '@mui/material';

import './styles.css';
import { getAssetTypes, getCollections } from '../../constants';

export function SelectAsset(props: { title: string, update: (data: {}) => void }) {
  const [collections, setCollections] = useState(['']);
  const [tokens, setTokens] = useState(['']);

  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedAssetAddress, setselectedAssetAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedAssetAmount, setSelectedAssetAmount] = useState('');

  const changeAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedAsset(e.target.value)
      setCollections(getCollections(e.target.value))
      props.update({
        asset: e.target.value,
        assetAddress: selectedAssetAddress,
        token: selectedToken,
        assetAmount: selectedAssetAmount
      })
    }
  }

  const changeCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setselectedAssetAddress(e.target.value)
      setTokens(getUserTokens())
      props.update({
        asset: selectedAsset,
        assetAddress: e.target.value,
        token: selectedToken,
        assetAmount: selectedAssetAmount
      })
    }
  }
  
  const changeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedToken(e.target.value)
    }
    props.update({
      asset: selectedAsset,
      assetAddress: selectedAssetAddress,
      token: e.target.value,
      assetAmount: selectedAssetAmount
    })
  }

  const changeAssetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setSelectedAssetAmount(e.target.value)
      props.update({
        asset: selectedAsset,
        assetAddress: selectedAssetAddress,
        token: selectedToken,
        assetAmount: e.target.value
      })
    }
  }

  const getUserTokens = () => {
    return [
      '3',
      '5'
    ]
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
        <TextField  select className='select' value={selectedToken} label={props.title + ' Asset Tokens'}onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeToken(e)}}>
          {tokens.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
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
        <TextField  select className='select' value={selectedToken} label={props.title + ' Asset Tokens'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeToken(e)}}>
          {tokens.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField className='select' value={selectedAssetAmount} label={props.title + ' Asset Amount'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {changeAssetAmount(e)}}></TextField>
      </Box>
      : null
    }      
    </Box>
  );
}