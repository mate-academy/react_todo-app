import { Box, Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../../types/FilterType';

type Props = {
  onRemoveCompleted: () => void;
  completedTodos: number;
  filterType: FilterType;
};

export const TodoFilter: React.FC<Props> = ({
  onRemoveCompleted,
  completedTodos,
  filterType,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        maxHeight: '42px',
        gap: '5px',
      }}
    >
      <ButtonGroup variant="outlined">
        <Button
          sx={{
            maxWidth: '47px',
            color: 'black',
            borderColor: 'black',
            backgroundColor: filterType === FilterType.All
              ? '#82D7FBE3'
              : 'transparent',
          }}
        >
          <NavLink
            to="/"
            className="navlink"
            replace
          >
            All
          </NavLink>
        </Button>

        <Button
          sx={{
            maxWidth: '75px',
            color: 'black',
            borderColor: 'black',
            backgroundColor: filterType === FilterType.Active
              ? '#82D7FBE3'
              : 'transparent',
          }}
        >
          <NavLink
            to="/active"
            className="navlink"
            replace
          >
            Active
          </NavLink>
        </Button>

        <Button
          sx={{
            maxWidth: '115px',
            color: 'black',
            borderColor: 'black',
            backgroundColor: filterType === FilterType.Completed
              ? '#82D7FBE3'
              : 'transparent',
          }}
        >
          <NavLink
            to="/completed"
            className="navlink"
            replace
          >
            Completed
          </NavLink>
        </Button>
      </ButtonGroup>

      <p>|</p>

      <Button
        variant="outlined"
        sx={{ width: 'max-content', color: 'black', borderColor: 'black' }}
        onClick={onRemoveCompleted}
        disabled={completedTodos === 0}
      >
        Clear completed
      </Button>
    </Box>
  );
};
