import classNames from 'classnames';
import React, { useState } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  onHandleSubmit: React.FormEventHandler<HTMLFormElement>;
  onHandleInput: React.ChangeEventHandler<HTMLInputElement>,
  setTodos(value: Todo[]): void,
  newTodoField: React.RefObject<HTMLInputElement>,
  inputValue: string;
  todos: Todo[];
};

export const Header: React.FC<Props> = ({
  onHandleSubmit,
  onHandleInput,
  setTodos,
  newTodoField,
  inputValue,
  todos,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleData = {
    completed: !isToggled,
  };

  const handleToggleButton = () => {
    setIsToggled(!isToggled);

    const moderatedTodos = todos.map(todo => {
      return {
        ...todo,
        ...toggleData,
      };
    });

    setTodos(moderatedTodos);
  };

  return (
    <header className="todoTodoPage__header">
      <button
        aria-label="toggle_button"
        id="toggle_button"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoTodoPage__toggle-all',
          { active: isToggled },
        )}
        onClick={handleToggleButton}
      />

      <form onSubmit={onHandleSubmit}>
        <input
          data-cy="editTodoField"
          type="text"
          ref={newTodoField}
          value={inputValue}
          className="todoTodoPage__new-todo"
          placeholder="What needs to be done?"
          onChange={onHandleInput}
        />
      </form>
    </header>
  );
};
