import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Inputs';

export type InputProps = {
  error: FieldError | undefined,
  register: UseFormRegister<Inputs>,
  message: string | undefined,
};
