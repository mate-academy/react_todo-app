import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from '../castomHuks/useDispatch';
import { addTodoToStorage } from '../api/todos';
import { ToggleButton } from './ToggleButtonHeader';
import { useGlobalState } from '../castomHuks/useGlobalState';

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
  }, []);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const addTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInput.trim().length === 0) {
      return;
    }

    const newTodo = {
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
      {todos.length > 0 && <ToggleButton />}

      <form onSubmit={addTitle}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={titleInput}
          ref={inputRef}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
