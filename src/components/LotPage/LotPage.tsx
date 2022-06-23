import { useEffect, useState } from 'react';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from "react-router-dom";

import './styles.css';
import { apiURL, contractsData } from '../../constants';
import { ReactComponent as BusdLogo } from '../../assets/busd.svg'
import { Lot } from '../../types/Lot';
import { ethers } from 'ethers';
import { useMetaMask } from '../../hooks/metamask';
import { useContracts } from '../../hooks/contracts';

const getLot = async (id: number) => {
    let response = await fetch(apiURL + '/getLotById?' + new URLSearchParams({
        id: id.toString()
    }));

    let lot: Lot = await response?.json();

    return lot;
}

export function LotPage() {
    const params = useParams();
    const { account } = useMetaMask() ?? {};
    const { t20, t1155, t721, p2p } = useContracts();
    
    const [lot, setLot] = useState<Lot>({
        id: 0,
        lotId: 0,
        status: 0,
        sellerAddress: "",
        proposedAssetAddress: "",
        proposedAssetId: 0,
        proposedAmount: 0,
        askedAssetAddress: "",
        askedAssetId: 0,
        askedAmount: 0,
        txHash: "",
        txHashSuccess: false,
        buyerAddress: "",
        createdAt: 0,
        updatedAt: ""
    });

    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [allowance, setAllowance] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(lot.askedAssetAddress) {
          checkAllowance()
          getCollectionName().then((res) => {
            setName(res)
          })
          getTokenImage(lot.lotId).then((res) => {
            setImageURL(res)
          })
        }
      }, [lot])

    useEffect(() => {
        getLot(Number(params.lotId)).then((res) => {
            setLot(res);
        })
    }, [params])

    const approve = () => {
        if(lot.askedAssetAddress === t20?.address) {
                t20?.approve(p2p.address, ethers.constants.MaxUint256).then((res: string) => {
            });
        }
    }

    const checkAllowance = () => {
        if(lot.askedAssetAddress === t20?.address) {
            t20?.allowance(account, p2p.address).then((res: string) => {
                setAllowance(res > lot.askedAssetAddress ? true : false);
            });
        }
    }

    const getCollectionName = async () => {
        return await t1155?.name();
    }

    const getTokenImage = async (tokenId: number) => {
        return await t1155?.uri(tokenId);
    }

    const buyLot = async () => {
        await p2p?.supportTradeSingle(lot.lotId)
    }

    const cancelLot = async () => {
        await p2p?.cancelTrade(lot.lotId)
    }

    return (
        <Box className="lot">
            <Box className='image-box'>
                <Box
                    className="image"
                    component="img"
                    src={imageURL || "https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"}
                />
            </Box>
            <Box className='info-box'>
                <Box className='lot-id'>
                    <Typography className="lot-id-title" variant="h4" component="h2">Lot №</Typography>
                    <Typography className="value" variant="h4" component="h2">{lot.lotId}</Typography>
                </Box>
                <Box className='token-name'>
                    <Typography className="token-title" variant="h2" component="h2">{name}</Typography>
                </Box>
                <Box className='token-collection'>
                    <Typography className="token-collection-title" variant="h6" component="h2">Collection:</Typography>
                    <Typography className="token-collection-address" variant="h6" component="h2">{lot.proposedAssetAddress}</Typography>
                </Box>
                <Box className='token-id'>
                    <Typography className="token-id-title" variant="h5" component="h2">Token ID:</Typography>
                    <Typography className="value" variant="h5" component="h2">{lot.proposedAssetId}</Typography>
                </Box>
                <Box className='token-amount'>
                    <Typography className="token-amount-title" variant="h5" component="h2">Token Amount:</Typography>
                    <Typography className="value" variant="h5" component="h2">{lot.proposedAmount + " pcs"}</Typography>
                </Box>
                
                <Box className="token-price">
                    <Typography className="token-price-title" variant="h5" component="h2">Price:</Typography>
                    <Typography className="value" variant="h5" component="h2">{lot.askedAmount}</Typography>
                    { lot.askedAssetAddress === contractsData.t20.address ?
                        <SvgIcon className='asset-icon' inheritViewBox component={BusdLogo}></SvgIcon>
                        : null
                    }
                </Box>
                <Box className='buy-lot-box'>
                    { lot?.sellerAddress !== account ?
                        allowance ?
                            <LoadingButton loading={loading} className="buy-lot-button" variant="contained" color="success" onClick={() => buyLot()}>Buy Lot</LoadingButton> :
                            <LoadingButton loading={loading} className="buy-lot-button" variant="contained" color="success" onClick={() => approve()}>Approve</LoadingButton> :
                        <Button className="buy-lot-button" variant="contained" color="error" onClick={() => cancelLot()}>Cancel Lot</Button>
                    }   
                </Box>
            </Box>
        </Box>
    )
}
