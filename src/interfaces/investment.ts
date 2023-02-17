export interface Investment {
  initialInvestment: number;
  years: number;
  interestRate: number;
  contributionRate: number;
  annualContribution?: number;
}

export interface InvestmentPeriod {
  initialInvestment: number;
  investmentReturn: number;
  endingBalance: number;
  contribution: number;
  year: number;
}

export interface GetCompoundInvestmentResponse {
  years: number;
  endingBalance: number;
  gain: number;
  history: InvestmentPeriod[];
}
