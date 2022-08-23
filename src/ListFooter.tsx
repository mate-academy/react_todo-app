import React, { useCallback, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { TodosContext } from './TodosProvider';
import { Status } from './types/Status';
import { deleteTodoFromServer } from './api';

import './styles/filters.scss';

const statuses = Object.entries(Status);

export const ListFooter = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);
  const activeTodo = useMemo(
    () => todos.filter(todo => !todo.completed).length, [todos],
  );
  const resetChange = useCallback(() => {
    setTodos([...todos]);
  }, [todos]);

  const handlerClearCompleted = useCallback(() => {
    const editedTodos = todos.filter(todo => !todo.completed);
    const clearTodos = todos.filter(todo => todo.completed);

    clearTodos.forEach((clearTodo) => {
      deleteTodoFromServer(clearTodo.id)
        .catch(resetChange);
    });

    setTodos(editedTodos);
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodo}
        {activeTodo < 2 ? ' item ' : ' items '}
        left
      </span>

      <ul className="filters">
        {statuses.map(status => (
          <li key={status[0]}>
            <NavLink
              to={`../${status[1]}`}
              className={({ isActive }) => {
                return isActive ? 'selected' : '';
              }}
            >
              {status[0]}
            </NavLink>
          </li>
        ))}
      </ul>

      {activeTodo < todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={handlerClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
