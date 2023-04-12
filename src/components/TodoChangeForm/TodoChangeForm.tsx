import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  onSubmit: (event: React.FormEvent) => void;
  query: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TodoChangeForm: React.FC<Props> = ({
  onSubmit,
  query,
  onInputChange,
}) => {
  return (
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
      />
    </form>
  );
};
