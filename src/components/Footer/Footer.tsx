import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer: React.FC = () => {
  const {
    todos, setTodos, activeTodos, completedTodos,
  } = useContext(TodosContext);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTodos.length}
        {' '}
        items left
      </span>

      <TodosFilter />

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
