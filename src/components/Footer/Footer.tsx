import React, { useContext } from 'react';
import { TodosFilter } from '../TodosFilter.tsx/TodosFilter';
import { TodosContext } from '../../TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const quantityTodos: number = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {quantityTodos} items left
      </span>

      <TodosFilter />

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
