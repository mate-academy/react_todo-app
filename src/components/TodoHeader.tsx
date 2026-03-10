import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAll } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      addTodo(trimmed);
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 ? (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      ) : null}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
