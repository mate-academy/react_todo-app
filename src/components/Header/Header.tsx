import { useContext, useLayoutEffect, useRef } from 'react';
import { Todo } from '../../types';
import { TodoContext } from '../../context/TodoContextProvider';
import cn from 'classnames';

export default function Header() {
  const { todos, setTodos } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const hasAllCompleted = todos.every(todo => todo.completed);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputRef.current) {
      const trimmedVal = inputRef.current?.value?.trim();

      if (trimmedVal !== '') {
        setTodos((prev: Todo[]) => [
          ...prev,
          { id: +new Date(), title: trimmedVal, completed: false },
        ]);

        inputRef.current.value = '';
      }
    }
  }

  function handleToggleAll() {
    const updatedTodos = hasAllCompleted
      ? todos.map(el => ({ ...el, completed: false }))
      : todos.map(el => (!el.completed ? { ...el, completed: true } : el));

    setTodos(updatedTodos);
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={cn('todoapp__toggle-all', { active: hasAllCompleted })}
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
}
