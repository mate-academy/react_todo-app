import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoFilter } from './TodoFilter';
import { Todo } from '../types/Todo';

export const TodoFooter: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todos, setTodos } = context;

  const clearComplete = () => {
    setTodos((prevTodos: Todo[]) => {
      const updatedTodos = prevTodos.filter(todo => !todo.completed);

      return updatedTodos;
    });
  };

  const isCompleted = todos.some(todo => todo.completed);

  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <TodoFilter />

      {isCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearComplete}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
