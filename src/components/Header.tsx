import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  newTodoField: React.RefObject<HTMLInputElement>;
  addNewTodo: (title: string) => void;
  toggleAllTodosStatus: () => void;
  isAllTodosCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  todos,
  newTodoField,
  addNewTodo,
  toggleAllTodosStatus,
  isAllTodosCompleted,
}) => {
  const [title, setTitle] = useState('');

  const onSumbit = async (event: React.FormEvent) => {
    event.preventDefault();
    addNewTodo(title);
    setTitle('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {(!!todos.length) && (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={cn(
            'todoapp__toggle-all',
            { active: isAllTodosCompleted },
          )}
          onClick={toggleAllTodosStatus}
        />
      )}

      <form
        onSubmit={onSumbit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
