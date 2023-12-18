import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { TodoClearCompleted } from './TodoClearCompleted';
import { TodoActiveCount } from './TodoActiveCount';
import { TodosContext } from '../context/TodosContext';

type Props = {
};

export const Footer: React.FC<Props> = () => {
  const { todos } = useContext(TodosContext);
  const completedTasksCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="footer">
      <TodoActiveCount />

      <TodoFilter />

      {!!completedTasksCount && (
        <TodoClearCompleted />
      )}
    </footer>
  );
};
