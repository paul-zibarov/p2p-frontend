import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ethers } from 'ethers';

import { useModals } from '../../hooks/modals';
import { useContracts } from '../../hooks/contracts';
import { useMetaMask } from '../../hooks/metamask';
import { SelectAsset } from '../SelectAsset';
import { Asset } from '../../types/Asset';
import { tradeDeadline } from '../../constants';
import './styles.css';

export function CreateLotModal() {
  const { setClose } = useModals() ?? {};
  const { account } = useMetaMask() ?? {};
  const { t20, t1155, t721, p2p } = useContracts();
  const [proposedAsset, setProposedAsset] = useState<Asset>();
  const [askedAsset, setAskedAsset] = useState<Asset>();
  const [allowance, setAllowance] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(proposedAsset?.address && proposedAsset?.type && proposedAsset.amount && proposedAsset.tokenId) {
      checkAllowance()
    }
  }, [proposedAsset?.address, proposedAsset?.type, proposedAsset?.amount, proposedAsset?.tokenId])

  const checkAllowance = () => {
    if(proposedAsset?.type === 'ERC-20') {
      t20?.allowance(account, p2p.address).then((res: string) => {
        setAllowance(res > proposedAsset.amount ? true : false);
      });
    } else if (proposedAsset?.type === 'ERC-721') {
      t721?.getApproved(proposedAsset.tokenId).then((res: string) => {
        setAllowance(res === proposedAsset.address ? true : false);
      });
    } else if (proposedAsset?.type === 'ERC-1155') {
      t1155?.isApprovedForAll(account, p2p.address).then((res: boolean) => {
        setAllowance(res);
      });
    }
  }

  const approve = () => {
    if(proposedAsset?.type === 'ERC-20') {
        t20?.approve(p2p.address, ethers.constants.MaxUint256).then((res: string) => {
      });
    } else if (proposedAsset?.type === 'ERC-721') {
      t721?.approve(p2p.address, proposedAsset.tokenId).then((res: string) => {
        setAllowance(res === proposedAsset.address ? true : false);
      });
    } else if (proposedAsset?.type === 'ERC-1155') {
      t1155?.setApprovalForAll(p2p.address, true).then((res: boolean) => {
        setAllowance(res);
      });
    }
  }

  const createTrade = (e: any) => {
    e.preventDefault();
    if(proposedAsset?.type === 'ERC-721' && askedAsset?.type === 'ERC-20') {
      p2p?.createTrade721to20(proposedAsset.address, proposedAsset.tokenId, askedAsset.address, '0x' + (Number(askedAsset.amount) * 10 ** 18).toString(16), tradeDeadline).then((tx: any) => {
      })
    } else if (proposedAsset?.type === 'ERC-1155' && askedAsset?.type === 'ERC-20') { 
      p2p?.createTrade1155to20(proposedAsset.address, proposedAsset.amount, proposedAsset.tokenId, askedAsset.address, '0x' + (Number(askedAsset.amount) * 10 ** 18).toString(16), tradeDeadline).then((tx: any) => {
    }
  }

  return (
    <Box className='modal'>
      <form onSubmit={(e: any) => createTrade(e)} >
        <Typography id="modal-modal-title" variant="h6" component="h2">Create Lot</Typography>
        <SelectAsset title='Proposed' update={setProposedAsset}></SelectAsset>
        <SelectAsset title='Asked' update={setAskedAsset}></SelectAsset>
        <Box className='menu'>
            { proposedAsset?.tokenId && askedAsset?.amount ? 
              allowance ?
                <LoadingButton loading={loading} className="menu-button" variant="contained" color="success" type='submit'>Create</LoadingButton> :
                <LoadingButton loading={loading} className="menu-button" variant="contained" color="success" onClick={() => approve()}>Approve</LoadingButton>
              : <Button className="menu-button" variant="contained" disabled color="success" onClick={() => setClose?.()}>Approve</Button>
            }
            <Button className="menu-button" variant="contained" color="error" onClick={() => setClose?.()}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
} 