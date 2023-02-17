import { FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { FC } from 'react';
import { InputProps } from './InputProps';

const Input:FC<InputProps> = ({error, ...props}) => {
  return (
    <FormControl variant="outlined" sx={{ width: '100%' }}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput 
      ref={props.ref} 
      error={Boolean(error)}
      {...props} 
      />
      {error && <Typography   variant='caption' color="red" >{error}</Typography>}
    </FormControl>
  );
};

export default Input;
