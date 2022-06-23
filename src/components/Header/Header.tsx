import { useState, useEffect } from 'react';
import { Button, SvgIcon, Box } from '@mui/material';

import { useMetaMask } from '../../hooks/metamask';
import { useContracts } from '../../hooks/contracts';
import { useNavigate } from "react-router-dom";
import { useModals } from '../../hooks/modals';
import './styles.css';
import { CreateLotModal } from '../CreateLotModal';
import { ReactComponent as BusdLogo } from '../../assets/busd.svg'

export function Header() {
  const { connect, disconnect, account } = useMetaMask() ?? {}
  const { setOpen } = useModals() ?? {}
  const { t20 } = useContracts()
  let navigate = useNavigate()

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    t20?.balanceOf(account).then((res: number) => {
      setBalance(res);
    })
  }, [account])

  return (
    <Box className="header">
      <Box className="connection">
        {account ? (
          <Box className="info">
            <Box className="balance">{(balance / 10 ** 18).toFixed(2).toString()}</Box>
            <SvgIcon className="asset" inheritViewBox component={BusdLogo}></SvgIcon>
            <Box className="address" onClick={() => {navigator.clipboard.writeText(account)}}>{account.substring(0, 10) + "..."}</Box>
          </Box>
        ) : (
          <Button className="connect-button" onClick={connect}>
            Connect wallet
          </Button>
        )}
      </Box>
      <nav className="menu">
        {account ? (
          <Box>
            <Button className="menu-button" variant="contained" onClick={() => {setOpen?.(<CreateLotModal></CreateLotModal>)}}>Create lot</Button>
            <Button className="menu-button" variant="contained" onClick={() => {navigate('/lots/my')}}>My lots</Button>
            <Button className="menu-button" variant="contained" onClick={() => {navigate('/lots/all')}}>All lots</Button>
          </Box>
        ) : (
          <Button className="menu-button" variant="contained" onClick={() => {navigate('/lots/all')}}>All lots</Button>
        )}
      </nav>
    </Box>
  );
}