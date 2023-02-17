import axios from 'axios';
import { urls } from './urls';
import { GetCompoundInvestmentResponse, Investment } from '../../interfaces';

export const getCompoundInvestment = async (
  investment: Investment
): Promise<GetCompoundInvestmentResponse | null> => {
  try {
    const response = await axios.post<GetCompoundInvestmentResponse>(
      urls.compound,
      investment
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
