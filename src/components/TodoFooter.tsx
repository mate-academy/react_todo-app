import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { TodoFilter } from './TodosFilter';
import { TodoClear } from './TodoClear';

export const TodoFooter: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {!!todos.length && (
        <footer className="footer" data-cy="todosFilter">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>
          <TodoFilter />
          <TodoClear />
        </footer>
      )}
    </>
  );
};
