import React, { useState, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { TodoContext } from './components/TodoContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { todos, addTodo, toggleAll } = useContext(TodoContext);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [title, setTitle] = useState<string>('');

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoField.current?.focus();
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle);
    setTitle('');
  };

  const visibleTodos = todos.filter((todo: Todo) => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const isAllCompleted =
    todos.length > 0 && todos.every((todo: Todo) => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
              ref={newTodoField}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            <Footer filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
