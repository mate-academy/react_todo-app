/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Box, Button } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { TodoChangeForm } from '../TodoChangeForm';

type Props = {
  onToggleAll: () => void;
  onSubmit: (event: React.FormEvent) => void;
  query: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  remainingTodos: number,
  disabledInput: boolean,
};

export const Header: React.FC<Props> = ({
  onToggleAll,
  onSubmit,
  query,
  onInputChange,
  remainingTodos,
  disabledInput,
}) => (
  <>
    <span className="header__count">
      {`Remaining tasks: ${remainingTodos}`}
    </span>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Button
        sx={{ display: 'block' }}
        type="button"
        onClick={onToggleAll}
      >
        <ExpandMoreOutlinedIcon
          sx={{ width: '32px', height: '32px', color: 'black' }}
        />
      </Button>

      <TodoChangeForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        query={query}
        disabledInput={disabledInput}
      />
    </Box>
  </>
);
