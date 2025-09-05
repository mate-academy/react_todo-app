import React, { useCallback, useContext, useMemo } from 'react';
import { TodoContext } from './TodoContext';
import cn from 'classnames';

type Props = {
  setTitle: (title: string) => void;
  title: string;
};

export const Header: React.FC<Props> = ({ setTitle, title }) => {
  const { addTodo, todos, setTodos, inputRef } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo({
      title: title.trim(),
      completed: false,
    });

    setTitle('');
  };

  const allTodosCompleted = useMemo(
    () => todos.length > 0 && todos.every(todo => todo.completed),
    [todos],
  );

  const toggleAllTodos = useCallback(() => {
    const shouldComplete = !allTodosCompleted;

    setTodos(current =>
      current.map(todo => ({
        ...todo,
        completed: shouldComplete,
      })),
    );
  }, [allTodosCompleted, setTodos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allTodosCompleted })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
