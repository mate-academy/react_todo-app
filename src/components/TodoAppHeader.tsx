import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from '../hooks/useTodo';
import cn from 'classnames';

export const TodoAppHeader: React.FC = () => {
  const { todos, addTodo, selectAllTodos, editingId } = useTodo();
  const [title, setTitle] = useState<string>('');

  const titleRef = useRef<HTMLInputElement>(null);
  const hasActiveTodos = todos.every(todo => todo.completed);

  useEffect(() => {
    if (editingId) {
      return;
    }

    titleRef.current?.focus();
  }, [editingId, todos]);

  const onAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimTitle = title.trim();

    if (!trimTitle) {
      return;
    }

    addTodo(trimTitle);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: hasActiveTodos })}
          data-cy="ToggleAllButton"
          onClick={() => selectAllTodos(!hasActiveTodos)}
        />
      )}

      <form onSubmit={onAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={titleRef}
        />
      </form>
    </header>
  );
};
