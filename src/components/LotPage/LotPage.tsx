import { useState } from 'react';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import { useParams } from "react-router-dom";

import './styles.css';
import { contractsData } from '../../constants';
import { ReactComponent as BusdLogo } from '../../assets/busd.svg'

export function LotPage() {
    let params = useParams();
    let [lot, setLot] = useState({ askedAsset: contractsData.t20.address});

    return (
        <Box className="lot">
            <Box className='image-box'>
                <Box
                    className="image"
                    component="img"
                    src="https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
                />
            </Box>
            <Box className='info-box'>
                <Box className='token-name'>
                    <Typography className="token-title" variant="h2" component="h2">Rickroll NFT</Typography>
                </Box>
                <Box className='token-id'>
                    <Typography className="token-id-title" variant="h4" component="h2">Token ID:</Typography>
                    <Typography className="value" variant="h4" component="h2">{params.lotId}</Typography>
                </Box>
                <Box className='token-collection'>
                    <Typography className="token-collection-title" variant="h6" component="h2">Collection:</Typography>
                    <Typography className="token-collection-address" variant="h6" component="h2">{"0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1".substring(0, 20) + "..."}</Typography>
                </Box>
                <Box className="token-price">
                    <Typography className="token-price-title" variant="h6" component="h2">Price:</Typography>
                    <Typography className="value" variant="h6" component="h2">1000</Typography>
                    { lot.askedAsset === contractsData.t20.address ?
                        <SvgIcon className='asset-icon' inheritViewBox component={BusdLogo}></SvgIcon>
                        : null
                    }
                    
                </Box>
                <Box className='buy-lot-box'>
                    <Button className='buy-lot-button' variant="contained" color="success">Buy Lot</Button>
                </Box>
            </Box>
        </Box>
    )
}
