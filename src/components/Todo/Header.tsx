import React, { FC, useState } from 'react';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[];
  handleSetTodos: (newTodo: Todo) => void;
};

export const Header: FC<Props> = ({ todos, handleSetTodos }) => {
  const [todoTitle, setTodoTitle] = useState<string>('');

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

    handleSetTodos(newTodo);
    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
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
          onKeyDown={e => {
            if (e.key === 'Escape') {
              setTodoTitle('');
            }
          }}
        />
      </form>
    </header>
  );
};
