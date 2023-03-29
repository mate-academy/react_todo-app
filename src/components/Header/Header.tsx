/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { countActiveTodos } from '../../utils';

type Props = {
  addTodo: (value: string) => void,
  tempTodo: Todo | null,
  toggleCompletedStatus: () => void,
  todos: Todo[],
};

export const Header: React.FC<Props> = ({
  addTodo,
  tempTodo,
  toggleCompletedStatus,
  todos,
}) => {
  const [value, setValue] = useState('');
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: !countActiveTodos(todos) },
        )}
        onClick={toggleCompletedStatus}
      />
      <form onSubmit={onSubmit}>
        <input
          disabled={!!tempTodo}
          name="title"
          value={value}
          onChange={changeValue}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
