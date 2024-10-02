import React, { useContext, useEffect, useRef } from 'react';
import { MyContext } from './state';
import { Todo } from '../Types/Todo';

export const Header = () => {
  const { todos, setTodos, title, setTitle } = useContext(MyContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const isAllCompleted = todos.every((todo: Todo) => todo.completed);

  function addTodo(e: React.FormEvent<HTMLFormElement>) {
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
  }

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 ? (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => {
            const allCompleted = todos.every((todo: Todo) => todo.completed);

            setTodos((currentTodos: Todo[]) =>
              currentTodos.map((todo: Todo) => ({
                ...todo,
                completed: !allCompleted,
              })),
            );
          }}
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
