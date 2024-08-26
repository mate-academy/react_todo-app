import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { useDispatch } from '../CustomHooks/useDispatch';
import { ToggleButtonHeader } from './ToggleButtonHeader';
import { Todo } from '../types/Todo';
import { addTodoToStorage } from '../api/todos';

export const Header: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');

  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      dispatch({ type: 'addInputRef', payload: inputRef });
    }
  }, [dispatch]); //for sure

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const addTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInput.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      completed: false,
      title: titleInput.trim(),
    };

    addTodoToStorage(newTodo);
    dispatch({ type: 'addTodo', payload: newTodo });
    setTitleInput('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length && <ToggleButtonHeader />}

      {/* Add a todo on form submit */}
      <form onSubmit={addTitle}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={titleInput}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
