import { ChangeEvent, FormEvent } from 'react';

export type Props = {
  handleSubmit: (e: FormEvent<Element>) => void;
  isCreated: boolean;
  value: string;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
