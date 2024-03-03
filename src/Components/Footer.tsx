import React, { useCallback, useContext, useMemo } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { TodosFilter } from './TodoFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const todosLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const removeCompletedTodos = useCallback(() => {
    setTodos(todos.filter(prevTodo => !prevTodo.completed));
  }, [setTodos, todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <TodosFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
