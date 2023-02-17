import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { formatCurrency } from '../../utils';
import { SummaryInvestmentProps } from './SummaryInvestmentProps';

const SummaryInvestment: FC<SummaryInvestmentProps> = (props) => {
  return (
    <Card>
      <CardHeader title="Resumen de la inversión" />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Container>
              <Typography variant="h6">Monto final</Typography>
              <Typography variant="h4">
                {formatCurrency(props.data?.endingBalance)}
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container>
              <Typography variant="h6">Ganancia por inversión</Typography>
              <Typography variant="h4">
                {formatCurrency(props.data?.gain)}
              </Typography>
            </Container>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SummaryInvestment;
