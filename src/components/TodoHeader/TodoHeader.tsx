import React, { useState } from 'react';
import { useSetTodos } from '../../hooks/useSetTodos';
import './TodoHeader.scss';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../hooks/useTodos';
import classNames from 'classnames';

export const TodoHeader = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const todos = useTodos();
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

  const handleToggleAll = () => {
    const newCompleted = !todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: newCompleted })),
    );
  };

  const areAllTodosCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todo-header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todo-header__toggle-all', {
            active: areAllTodosCompleted,
          })}
          onClick={handleToggleAll}
          data-cy="ToggleAllButton"
        />
      )}

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
