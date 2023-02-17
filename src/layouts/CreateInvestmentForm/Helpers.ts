import { Investment } from "../../interfaces";

interface InvestmentFormProps {
    id: string;
    label: string;
    type: string;
    key: keyof Investment;
    required: boolean;
    startAdornment?: string;
    endAdornment?: string;
    rows: number;
}

export const formInputs: InvestmentFormProps[] = [
  {
    id: 'outlined-adornment-initial-investment',
    label: 'Inversión inicial',
    type: 'number',
    key: 'initialInvestment',
    required: true,
    startAdornment: '$',
    rows: 4,
  },
  {
    id: 'outlined-adornment-annual-contribution',
    label: 'Aportación anual',
    type: 'number',
    key: 'annualContribution',
    required: true,
    startAdornment: '$',
    rows: 4,
  },
  {
    id: 'outlined-adornment-adornment-years',
    label: 'Años de inversión',
    type: 'number',
    key: 'years',
    required: true,
    rows: 4,
  },
  {
    id: 'outlined-adornment-contribution-rate',
    label: '% de incremento a la aportación anual',
    type: 'number',
    key: 'contributionRate',
    required: true,
    endAdornment: '%',
    rows: 6,
  },
  {
    id: 'outlined-adornment-interest-rate',
    label: 'Rendimiento de la inversión',
    type: 'number',
    key: 'interestRate',
    required: true,
    endAdornment: '%',
    rows: 6,
  },
];

export const createValidators = <CreateValidatorType extends Function>(createValidator: CreateValidatorType) => {
  formInputs.forEach((input) => {
    createValidator(input.key, 
      (value: number) => (value > 0 && Number.isInteger(value)) || input.required === false,
      'El campo es requerido y debe ser mayor a 0');
  });
}