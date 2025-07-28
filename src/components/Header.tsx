import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types/Todo';

export const Header = () => {
  const { todos, setTodos, activeTodosAmount } = useTodos();
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    const tempTodo: Todo = {
      title: query.trim(),
      id: +new Date(),
      completed: false,
    };

    setTodos((prev: Todo[]) => [...prev, tempTodo]);
    setQuery('');
  };

  const handleTodosToggle = () => {
    const todosToUpdate = !activeTodosAmount
      ? todos
      : todos.filter(todo => !todo.completed);

    setTodos(prev => {
      return prev.map(t => {
        return todosToUpdate.includes(t)
          ? { ...t, completed: !t.completed }
          : t;
      });
    });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={
            'todoapp__toggle-all' + (!activeTodosAmount ? ' active' : '')
          }
          data-cy="ToggleAllButton"
          onClick={() => handleTodosToggle()}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
