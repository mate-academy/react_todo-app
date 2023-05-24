/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onAddTodo: (todo: Todo) => void,
  isToggleAllActive: boolean,
  handleToggleClick: () => void,
};

export const Header: React.FC<Props> = ({
  onAddTodo, isToggleAllActive, handleToggleClick,
}) => {
  const [newTodoValue, setNewTodoValue] = useState('');

  const createNewTodo = () => {
    if (newTodoValue.trim() === '') {
      return;
    }

    const newTodo = {
      title: newTodoValue.trim(),
      completed: false,
      id: +Date.now(),
    };

    onAddTodo(newTodo);
    setNewTodoValue('');
  };

  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewTodo();
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: isToggleAllActive },
        )}
        onClick={() => handleToggleClick()}
      />

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
        />
      </form>
    </header>
  );
};
