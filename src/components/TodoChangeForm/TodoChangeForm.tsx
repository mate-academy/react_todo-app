import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  onSubmit: (event: React.FormEvent) => void;
  query: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabledInput: boolean,
};

export const TodoChangeForm: React.FC<Props> = ({
  onSubmit,
  query,
  onInputChange,
  disabledInput,
}) => (
  <form onSubmit={onSubmit}>
    <TextField
      variant="outlined"
      label="Add new task"
      value={query}
      onChange={onInputChange}
      autoComplete="off"
      sx={{
        width: '380px',
      }}
      disabled={disabledInput}
    />
  </form>
);
