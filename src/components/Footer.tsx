import React from 'react';
import { TodoCount } from './TodoCount';
import { Filters } from './Filters';
import { ClearCompletedButton } from './ClearCompletedButton';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <TodoCount />
      <Filters />
      <ClearCompletedButton />
    </footer>
  );
};
