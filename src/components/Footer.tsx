import React, { useContext } from 'react';
import { TodoCount } from './TodoCount';
import { Filters } from './Filters';
import { ClearCompletedButton } from './ClearCompletedButton';
import { TodosContext } from '../contexts/TodosContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const areCompletedExist = todos.filter(todo => todo.completed).length > 0;

  return (
    <footer className="footer">
      <TodoCount />
      <Filters />
      {areCompletedExist && <ClearCompletedButton />}
    </footer>
  );
};
