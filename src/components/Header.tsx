import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const Header = () => {
  const [inputText, setInputText] = useState('');
  const { todos, setTodos, toggleAll } = useContext(TodoContext);
  const allCompleted = todos.every(todo => todo.completed);

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
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

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
