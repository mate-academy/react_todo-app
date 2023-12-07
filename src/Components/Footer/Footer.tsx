import React, { useContext } from 'react';
import { TodosFilter } from '../TodosFilter/TodosFilter';

import { TodoContext } from '../../contexts/TodoContext';

export const Footer: React.FC = () => {
  const { todoList } = useContext(TodoContext);
  const todoLeft = todoList.length;

  return (
    <>
      {todoLeft > 0 && (
        <footer className="footer">
          <TodosFilter />
        </footer>
      )}
    </>
  );
};
