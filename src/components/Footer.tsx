import React, { useContext } from 'react';
import { TodoCount } from './TodoCount';
import { ClearCompletedButton } from './ClearComplitedButton';
import { TodosContext } from '../contexts/TodosContext';
import { TodosFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const isAreCompleted = todos.filter(todo => todo.completed).length > 0;

  return (
    <footer className="footer">
      <TodoCount />
      <TodosFilter />
      {isAreCompleted && <ClearCompletedButton />}
    </footer>
  );
};
