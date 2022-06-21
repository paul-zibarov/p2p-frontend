import { useState } from 'react';
import { useModals } from '../../hooks/modals';

import { Box, Button, Typography } from '@mui/material';
import { SelectAsset } from '../SelectAsset';

import './styles.css';

export function CreateLotModal() {
  const { setClose } = useModals() ?? {}
  const [proposedAsset, setProposedAsset] = useState({})
  const [askedAsset, setAskedAsset] = useState({})

  const createTrade = (e: any) => {
    e.preventDefault();
    console.log(proposedAsset)
    console.log(askedAsset)
  }

  return (
    <Box className='modal'>
      <form onSubmit={(e: any) => createTrade(e)} >
        <Typography id="modal-modal-title" variant="h6" component="h2">Create Lot</Typography>
        <SelectAsset title='Proposed' update={setProposedAsset}></SelectAsset>
        <SelectAsset title='Asked' update={setAskedAsset}></SelectAsset>
        <Box className='menu'>
            <Button className="menu-button" variant="contained" color="success" type='submit'>Create</Button>
            <Button className="menu-button" variant="contained" color="error" onClick={() => setClose?.()}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}