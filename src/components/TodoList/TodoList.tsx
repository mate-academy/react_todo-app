/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem';
import { TodosFilter } from '../TodosFilter';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [filterParam, setFilterParam] = useState('All');

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todosCopy = [...todos].map(todo => ({
      ...todo, completed: event.target.checked,
    }));

    setTodos(todosCopy);
  };

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

            <ul className="todo-list" data-cy="todoList">
              {todos.filter(todo => {
                switch (filterParam) {
                  case ('All'):
                    return true;
                  case ('Active'):
                    return !todo.completed;
                  case ('Completed'):
                    return todo.completed;
                  default:
                    return true;
                }
              }).map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
          <TodosFilter
            onClick={(newFilter) => setFilterParam(newFilter)}
            selectedFilterParam={filterParam}
          />
        </>
      )}
    </>
  );
};
