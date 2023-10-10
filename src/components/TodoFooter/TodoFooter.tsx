import React, { useContext } from 'react';
import { TodosContext } from '../../TodoProvider';
import { TodoFilter } from '../TodoFilter/TodoFilter';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClear = () => {
    const onlyActiveTodos = todos.filter(todo => !todo.completed);

    setTodos(onlyActiveTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.filter(todo => !todo.completed).length}
        {' '}
        items left
      </span>

      <TodoFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
