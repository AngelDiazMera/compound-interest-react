import { Card, CircularProgress, Container, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { ChangeEvent, FocusEventHandler, useMemo } from 'react';
import { Input } from '../../components';
import { Investment } from '../../interfaces';
import { useValidatedFormData } from '../../hooks/useValidatedFormData';
import { createValidators, formInputs } from './Helpers';
import { useGetCompoundInvestment } from '../../hooks/useGetCompoundInvestment';
import InvestmentTable from '../InvestmentTable/InvestmentTable';
import SummaryInvestment from '../SummaryInvestment/SummaryInvestment';

function CreateInvestmentForm() {
  const [{ data, isLoading, hasError }, getCompoundInvestment] =
    useGetCompoundInvestment();

  const [formData, { createValidator, isValid, validate }] =
    useValidatedFormData<Investment>({
      contributionRate: 0,
      interestRate: 0,
      years: 0,
      annualContribution: 0,
      initialInvestment: 0,
    });
  createValidators(createValidator);

  const formResult = useMemo(() => {
    const result = {} as Investment;
    for (const key in formData) {
      // @ts-ignore
      result[key] = formData[key].value;
    }
    return result;
  }, [formData]);

  const handleFormChange =
    (target: keyof Investment) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      validate(target, Number(value));
    };

  const handleFormSubmit = () => getCompoundInvestment(formResult);

  const shouldRenderResult = data && !isLoading && !hasError;

  return (
    <Container
      sx={{
        maxWidth: 768,
        margin: '1rem',
        gap: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card>
        <CardHeader title="Calculadora de interés compuesto" />
        <CardContent>
          <Grid container spacing={2}>
            {formInputs.map(
              ({ rows, startAdornment, endAdornment, key, ...props }) => (
                <Grid item xs={12} sm={rows} key={key}>
                  <Input
                    {...(startAdornment && {
                      startAdornment: (
                        <InputAdornment position="start">
                          {startAdornment}
                        </InputAdornment>
                      ),
                    })}
                    {...(endAdornment && {
                      endAdornment: (
                        <InputAdornment position="end">
                          {endAdornment}
                        </InputAdornment>
                      ),
                    })}
                    {...props}
                    onChange={handleFormChange(key)}
                    onBlur={
                      handleFormChange(
                        key
                      ) as FocusEventHandler<HTMLInputElement>
                    }
                    // @ts-ignore
                    error={formData[key]?.error}
                    required
                  />
                </Grid>
              )
            )}
            <Grid
              container
              sx={{ marginTop: '1rem', gap: '1rem' }}
              justifyContent="flex-end"
              alignItems="center"
              flexDirection={{ xs: 'row' }}
            >
              {hasError && (
                <Typography variant="caption" color="red">
                  No es posible procesar su solicitud con los datos
                  proporcionados
                </Typography>
              )}
              <Button
                variant="contained"
                size="large"
                disabled={!isValid || isLoading}
                onClick={handleFormSubmit}
                startIcon={isLoading && <CircularProgress size={20} />}
              >
                {isLoading ? 'Calculando...' : 'Calcular'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {shouldRenderResult && <SummaryInvestment data={data} />}
      {shouldRenderResult && <InvestmentTable history={data.history} />}
    </Container>
  );
}

export default CreateInvestmentForm;
