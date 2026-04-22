import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/TodosContext';
import classNames from 'classnames';
import { TodosType } from '../../types/TodosInterface';

export const Header: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');
  const fieldFocus = useRef<HTMLInputElement | null>(null);

  const allTodosCopleted = [...todos].every(
    (currentTodos: TodosType) => currentTodos.completed,
  );

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    dispatch({ type: 'add', title: title });
    setTitle('');
  };

  useEffect(() => {
    if (fieldFocus.current) {
      fieldFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (fieldFocus.current) {
      fieldFocus.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCopleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'completeAll' })}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={fieldFocus}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
