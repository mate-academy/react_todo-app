import React, { FC, useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/todo';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../context/Store';

type Props = {
  mainRef: React.RefObject<HTMLInputElement>;
};

export const Header: FC<Props> = ({ mainRef }) => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isActiveToggleAll =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() === '') return;

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 100;

    const newTodo: Todo = {
      id: maxId + 1,
      title: todoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });
    dispatch('all');
    setTodoTitle('');
  };

  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isActiveToggleAll,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      {/* Add a todo on form submit */}

      <form onSubmit={handleSubmitTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
          ref={mainRef}
        />
      </form>
    </header>
  );
};
