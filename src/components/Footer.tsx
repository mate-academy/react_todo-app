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

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>

      <TodoFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={handleTodoCleaning}
      >
        Clear completed
      </button>
    </footer>
  );
};
