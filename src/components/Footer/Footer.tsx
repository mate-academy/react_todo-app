import React, { useContext } from 'react';
import { TodosFilter } from '../TodosFilter.tsx/TodosFilter';
import { TodosContext } from '../../TodosContext';

export const Footer: React.FC = () => {
  // eslint-disable-next-line operator-linebreak
  const { todos, setTodos, filterStatus, setFilterStatus } =
    useContext(TodosContext);
  const quantityTodos: number = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {quantityTodos} items left
      </span>

      <TodosFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
