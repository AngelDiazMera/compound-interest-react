import { useState } from 'react';
import { GetCompoundInvestmentResponse, Investment } from '../../interfaces';
import { getCompoundInvestment } from '../../services';

export const useGetCompoundInvestment = () => {
  const [currentInvestment, setCurrentInvestment] =
    useState<GetCompoundInvestmentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const reFetch = async (investment: Investment): Promise<void> => {
    setLoading(true);
    setHasError(false);

    investment.contributionRate /= 100;
    investment.interestRate /= 100;

    const data = await getCompoundInvestment(investment);

    if (data != null) setCurrentInvestment(data);
    else setHasError(true);

    setLoading(false);
  };

  const returnState = {
    data: currentInvestment,
    isUninitialized: !currentInvestment && !loading && !hasError,
    isLoading: loading && !hasError,
    hasError,
  };

  return [returnState, reFetch] as const;
};
