import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Pagination, Box, SvgIcon } from '@mui/material';

import { useNavigate } from "react-router-dom";

import { ReactComponent as BusdLogo } from '../../assets/busd.svg'
import './styles.css';



// const getRows = (page: number, countPerPage: number) => {
const getRows = () => {
  return [
    { 
      id: 1, 
      collection: "Rickroll NFT",
      tokenId: 1, 
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 100, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 2, 
      collection: "Rickroll NFT",
      tokenId: 2,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 1000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 3, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 4, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 5, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 6, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 7, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 8, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    },
    { 
      id: 9, 
      collection: "Rickroll NFT",
      tokenId: 3,  
      owner: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1", 
      price: 10000, 
      currency: "0xAB2E112c21B498ed5c017d742b0DeAC6e09E8FD1"
    }
  ];
}

export function LotTable() {
  let navigate = useNavigate()

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lot id</TableCell>
            <TableCell align="right">Collection</TableCell>
            <TableCell align="right">Token ID</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell onClick={() => {}} align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows().map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.collection}</TableCell>
              <TableCell align="right">{row.tokenId}</TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right" className='asset'>
                <SvgIcon className='asset-icon' inheritViewBox component={BusdLogo}></SvgIcon>
              </TableCell>
              <TableCell align="right">
                <Button className="button" variant="contained" onClick={() => {navigate(`/lots/${row.id}`)}}>Details</Button>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="pagination" count={3} variant="outlined" color="primary" size="large" />
    </Box>
  );
}