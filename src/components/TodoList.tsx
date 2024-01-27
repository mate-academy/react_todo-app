/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { TodosContext } from './Store';
import { TodoItem } from './TodoItem';
import { IsCompletedAll } from '../types/isCompletedAll';

type Props = {};

export const TodoList: React.FC<Props> = React.memo(() => {
  const {
    todos,
    setIsCompletedAll,
    filteredTodos,
  } = useContext(TodosContext);

  let checked = todos.every(todo => todo.complete);
  let hasToggle = todos.length > 0;

  useEffect(() => {
    checked = todos.every(todo => todo.complete);
    hasToggle = todos.length > 0;
  }, [todos]);

  const handleCheckedAll = () => {
    setIsCompletedAll((prevCompletedAll: IsCompletedAll) => {
      if (!prevCompletedAll) {
        return true;
      }

      return !prevCompletedAll;
    });
  };

  return (
    <>
      {hasToggle && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleCheckedAll}
            checked={checked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </>
  );
});
