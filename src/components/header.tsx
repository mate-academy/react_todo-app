import React, { useContext } from 'react';
import { MyContext } from './state';
import { Todo } from '../Types/Todo';

export const Header = () => {
  const { todos, setTodos, title, setTitle, inputRef } = useContext(MyContext);

  const isAllCompleted = todos.every((todo: Todo) => todo.completed);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return;
    }

    const todo = {
      title: trimmedTitle,
      id: Date.now(),
      completed: false,
    };

    setTodos((currentTodos: Todo[]) => [...currentTodos, todo]);
    setTitle('');
  };

  const toogleTodoComplete = () => {
    {
      const allCompleted = todos.every((todo: Todo) => todo.completed);

      setTodos((currentTodos: Todo[]) =>
        currentTodos.map((todo: Todo) => ({
          ...todo,
          completed: !allCompleted,
        })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 ? (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toogleTodoComplete}
        />
      ) : null}

      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
