import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { TodosContext } from '../Store';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query) {
      setTodos([
        ...todos,
        { id: `${+new Date()}`, title: query.trim(), completed: false },
      ]);
    }

    setQuery('');
  }

  const isAllCompleted = todos.every((todo: Todo) => todo.completed === true);

  function handleToggle(completed: boolean) {
    const newList = todos.map((todo: Todo) => {
      return { ...todo, completed: !completed };
    });

    setTodos(newList);
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          defaultChecked={isAllCompleted ? true : false}
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => handleToggle(isAllCompleted)}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={event => handleSubmit(event)}>
        <input
          ref={input => input && input.focus()}
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => {
            setQuery(event.target.value.trimStart());
          }}
        />
      </form>
    </header>
  );
};
