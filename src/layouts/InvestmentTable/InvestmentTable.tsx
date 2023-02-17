import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { FC } from 'react'
import { formatCurrency } from '../../utils'
import { InvestmentTableProps } from './InvestmentTableProps'

export const InvestmentTable: FC<InvestmentTableProps> = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Año</TableCell>
            <TableCell>Saldo inicial</TableCell>
            <TableCell>Aportación</TableCell>
            <TableCell>Rendimiento</TableCell>
            <TableCell>Saldo final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.history.map((investmentPeriod) => (
            <TableRow
              key={investmentPeriod.year}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {investmentPeriod.year}
              </TableCell>
              <TableCell>{formatCurrency(investmentPeriod.initialInvestment)}</TableCell>
              <TableCell>{formatCurrency(investmentPeriod.contribution)}</TableCell>
              <TableCell>{formatCurrency(investmentPeriod.investmentReturn)}</TableCell>
              <TableCell>{formatCurrency(investmentPeriod.endingBalance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InvestmentTable