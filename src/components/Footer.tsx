import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter/TodoFilter';
import { TodosContext } from '../contexts/TodosContext';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => (todo.completed === false));

  const handleTodoCleaning = () => {
    setTodos(todos.filter(todo => (todo.completed === false)));
  };

  const hasEnoughCompletedTodo = todos.some(todo => todo.completed === true);

  const hasEnoughTodos = todos.length > 0;

  return (
    <footer className="footer">
      {hasEnoughTodos && (
        <div>
          <span className="todo-count" data-cy="todosCounter">
            {`${uncompletedTodos.length} items left`}
          </span>

          <TodoFilter />

          {hasEnoughCompletedTodo && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleTodoCleaning}
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </footer>
  );
};
