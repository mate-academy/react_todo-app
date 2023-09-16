/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { useTodos } from '../../TodosContext';
import { TodoItem } from '../TodoItem';
import { TodosFilter } from '../TodosFilter';
import { Status } from '../../utils/Status';

export const TodoList = () => {
  const { todos, setTodos } = useTodos();

  const [filterParam, setFilterParam] = useState(Status.All);

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(prev => prev.map(todo => ({
      ...todo, completed: event.target.checked,
    })));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterParam) {
        case (Status.All):
          return todo;
        case (Status.Active):
          return !todo.completed;
        case (Status.Completed):
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [filterParam, todos]);

  return (
    <>
      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list" data-cy="todosList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
          <TodosFilter
            onClick={(newFilter) => setFilterParam(newFilter as Status)}
            selectedFilterParam={filterParam}
          />
        </>
      )}
    </>
  );
};
