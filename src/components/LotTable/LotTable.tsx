import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box, SvgIcon, TablePagination } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ReactComponent as BusdLogo } from '../../assets/busd.svg'
import { useMetaMask } from '../../hooks/metamask';
import { Lot } from '../../types/Lot';
import { apiURL, contractsData } from '../../constants';
import './styles.css';

const getLots = async (page: number, countPerPage: number, type: string, account: string) => {
  let response;
  if(type === 'all') {
    response = await fetch(apiURL + '/getActiveLots?' + new URLSearchParams({
      page: page.toString(),
      countPerPage: countPerPage.toString()
    }));
  } else {
    response = await fetch(apiURL + '/getOwnerLots?' + new URLSearchParams({
      page: page.toString(),
      countPerPage: countPerPage.toString(),
      owner: account
    }));
  }
  
  let lots: Array<Lot> = await response?.json();

  return lots;
}

const getLotsCount = async (type: string, account: string) => {
  let response;
  if(type === 'all') {
    response = await fetch(apiURL + '/getActiveLotsCount');
  } else {
    response = await fetch(apiURL + '/getActiveOwnerLotsCount?' + new URLSearchParams({
      owner: account
    }));
  }
  
  let data: { count: number } = await response?.json();

  return data.count;
}

export function LotTable(props: { type: string }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lots, setLots] = useState<Lot[]>([]);
  const [lotsCount, setLotsCount] = useState(0);

  const { account } = useMetaMask() ?? { account: "" };

  useEffect(() => {
    setLots([])
    getLots(page + 1, rowsPerPage, props.type, account || "").then((res) => {
      setLots(res);
      getLotsCount(props.type, account || "").then((res) => {
        setLotsCount(res);
      })
    });

  }, [page, rowsPerPage, props.type, account])

  let navigate = useNavigate()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lot id</TableCell>
            <TableCell>Proposed Asset</TableCell>
            <TableCell>Proposed Token ID</TableCell>
            <TableCell>Proposed Amount</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Asked Amount</TableCell>
            <TableCell>Asked Asset</TableCell>
            <TableCell>Asked Token ID</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lots.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.lotId}</TableCell>
              <TableCell>{row.proposedAssetAddress}</TableCell>
              <TableCell>{row.proposedAssetId}</TableCell>
              <TableCell>{row.proposedAmount}</TableCell>
              <TableCell>{row.sellerAddress}</TableCell>
              <TableCell>{row.askedAmount}</TableCell>
              <TableCell>{
                row.askedAssetAddress === contractsData.t20.address ? 
                  <SvgIcon className='asset-icon' inheritViewBox component={BusdLogo}></SvgIcon> : 
                  row.askedAssetAddress}
              </TableCell>
              <TableCell>{row.askedAssetId}</TableCell>
              <TableCell>
                <Button className="button" variant="contained" onClick={() => {navigate(`/lots/${row.id}`)}}>Details</Button>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination component="div" count={lotsCount} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage}/>
    </Box>
  );
}