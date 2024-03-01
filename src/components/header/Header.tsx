import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Action } from '../../types/Action';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');

  const { todos } = useContext(StateContext);

  const maxId =
    todos.length > 0
      ? todos.reduce((max, obj) => (obj.id > max ? obj.id : max), todos[0].id)
      : 0;

  const actionAdd: Action = {
    type: 'add',
    todo: {
      id: maxId + 1,
      title: value.trim(),
      completed: false,
    },
  };

  const dispatch = useContext(DispatchContext);

  const add = () => {
    if (value.trim().length === 0) {
      setValue('');

      return;
    }

    dispatch(actionAdd);
  };

  const onKeyDownHandle = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && value.trim().length === 0) {
      event.preventDefault();
      setValue('');

      return;
    }

    if (event.key === 'Escape') {
      setValue('');
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={event => {
          event.preventDefault();

          add();
          setValue('');
        }}
      >
        <input
          value={value}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={event => setValue(event.target.value)}
          onKeyDown={onKeyDownHandle}
        />
      </form>
    </header>
  );
};
