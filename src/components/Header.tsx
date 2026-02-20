import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

export const Header = () => {
  const [inputText, setInputText] = useState('');
  const { setTodos } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: inputText.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setInputText('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputText(e.target.value);
          }}
        />
      </form>
    </header>
  );
};
