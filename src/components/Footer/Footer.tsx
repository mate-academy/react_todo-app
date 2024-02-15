import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const countActive = todos.filter(el => !el.completed).length;

  const handleClick = () => {
    const newTodos = todos.filter(el => !el.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActive} items left`}
      </span>

      <TodosFilter />

      {todos.length !== countActive && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
