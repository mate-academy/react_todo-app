/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback, memo } from 'react';
import { TodoList } from './TodoList';
import { Todo } from '../Types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoApp: React.FC<Props> = memo(({ todos, setTodos }) => {
  const [title, setTitle] = useState('');

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [title]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  }, [todos, title]);

  const handleMarkAll = useCallback(() => {
    const completedTodos = todos.every(todo => todo.completed);

    const allTodos = todos.map(todo => {
      if (completedTodos) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      if (!completedTodos) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    });

    setTodos([...allTodos]);
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => handleTitle(e)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleMarkAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={todos} setTodos={setTodos} />
          </section>

          <TodoFilter todos={todos} setTodos={setTodos} />
        </>
      )}
    </div>
  );
});
