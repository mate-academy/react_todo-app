import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, TodosDataContext } from '../../contexts';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todos } = useContext(TodosDataContext);
  const dispatchTodosData = useContext(DispatchContext);
  const [inputValue, setInputValue] = useState('');

  const allTodosComplete = todos.every(todo => todo.completed);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => inputElement.current?.focus(), [todos]);

  const submitForm = (e: React.FormEvent) => {
    if (inputValue.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      title: inputValue.trim(),
      completed: false,
      id: +new Date(),
    };

    dispatchTodosData({ type: 'addTodo', payload: newTodo });
    setInputValue('');
    e.preventDefault();
  };

  function toggleAllTodos() {
    dispatchTodosData({ type: 'togleAll', payload: allTodosComplete });
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosComplete,
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAllTodos()}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submitForm}>
        <input
          ref={inputElement}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
