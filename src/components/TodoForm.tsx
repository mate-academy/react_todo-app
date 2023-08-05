import { FC, FormEvent, useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { Todo } from '../types';

export const TodoForm: FC = () => {
  const {
    onAddTodo,
    activeTodosLeft,
    todosCount,
    onToggleSeveralTodos,
  } = useTodoContext();
  const [title, setTitle] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    onAddTodo(newTodo);

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>

      {todosCount > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={activeTodosLeft === 0}
            onChange={onToggleSeveralTodos}
          />

          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all" />
        </>
      )}
    </header>
  );
};
