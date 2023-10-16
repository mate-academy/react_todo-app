import React, { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { getVisibleTodos } from '../../utils/getVisibleTodos';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[],
  setTodos: (data: Todo[]) => void
};

export const TodoSection: React.FC<Props> = React.memo(({
  todos,
  setTodos,
}) => {
  const isAllTodosActive = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const { pathname } = useLocation();

  const handleToggleAll = () => {
    if (isAllTodosActive) {
      return setTodos(todos.map(todo => (
        {
          ...todo,
          completed: false,
        }
      )));
    }

    return setTodos(todos.map(todo => (
      todo.completed
        ? todo
        : {
          ...todo,
          completed: true,
        }
    )));
  };

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className={classNames('toggle-all', {
              active: isAllTodosActive,
            })}
            data-cy="toggleAll"
            onChange={handleToggleAll}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <Routes>
            {Object.values(FilterType).map(value => (
              <Route
                key={value}
                path={value}
                element={(
                  <TodoList
                    todos={getVisibleTodos(pathname, todos)}
                    setTodos={setTodos}
                  />
                )}
              />
            ))}
          </Routes>
        </>
      )}
    </section>
  );
});
