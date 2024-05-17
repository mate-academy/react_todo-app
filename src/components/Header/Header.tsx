import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface HeaderProps {
  addTodo: (text: string) => void;
  todos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
  setTodos: (todos: Todo[]) => void;
}

export const Header: React.FC<HeaderProps> = ({
  addTodo,
  todos,
  inputRef,
  setTodos,
}) => {
  const [title, setTitle] = useState('');

  const allCompleted = todos.every(todo => todo.completed);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (title) {
      addTodo(title.trim());
      setTitle('');
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
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
