import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../../Store';

type Props = {
  allTodosCompleted: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  focusNewTodoField: () => void;
};

export const Header: React.FC<Props> = ({
  allTodosCompleted,
  inputRef,
  focusNewTodoField,
}) => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleToggleAll = () => {
    dispatch({ type: 'toggleAll' });
    focusNewTodoField();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clearTitle = title.trim();

    if (clearTitle.length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: clearTitle,
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });

    setTitle('');

    focusNewTodoField();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
