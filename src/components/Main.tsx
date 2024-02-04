/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../variables/TodosContext.1';

export const Main: React.FC<{}> = () => {
  const {
    todos,
    setAllCompletedOrRemoveCompleted,
    filteredTodosForList,
  } = useContext(TodosContext);

  const handleToggleAll = () => {
    setAllCompletedOrRemoveCompleted(todos);
  };

  const isAllTodosCompleted = todos.every(todo => todo.completed === true);
  const isThereTodos = todos.length;

  return (
    isThereTodos ? (
      <section className="main">
        <input
          checked={isAllTodosCompleted}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={filteredTodosForList} />
      </section>
    ) : null
  );
};
