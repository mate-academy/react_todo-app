import React, { useState } from 'react';
import { useSetTodos } from '../../hooks/useSetTodos';
import './TodoHeader.scss';
import { Todo } from '../../types/Todo';

export const TodoHeader = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const setTodos = useSetTodos();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setNewTodoTitle('');
  };

  return (
    <header className="todo-header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todo-header__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todo-header__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setNewTodoTitle(event.target.value)}
          value={newTodoTitle}
        />
      </form>
    </header>
  );
};
