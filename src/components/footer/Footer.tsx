import React, { useCallback, useContext, useMemo } from 'react';
import TodoFilter from '../todo-filter/TodoFilter';
import { TodosContext } from '../../utils/TodosContext';

const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const howManyTodosLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const clearTodosCompleted = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [setTodos, todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {howManyTodosLeft} items left
      </span>

      <TodoFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearTodosCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
