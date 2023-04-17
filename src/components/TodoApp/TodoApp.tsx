import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';
import { TodoFilter, StatusOfFilter } from '../TodoFilter';
import { useLocalStorage } from '../../helpers/useLocalStorage';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(StatusOfFilter.All);

  const notCompletedTogglers = todos.filter(
    todo => !todo.completed,
  );

  const completedTogglers = todos.filter(
    todo => todo.completed,
  );

  const updatedTodos = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case StatusOfFilter.All:
        return true;
      case StatusOfFilter.Active:
        return !todo.completed;
      case StatusOfFilter.Completed:
        return todo.completed;
      default:
        throw new Error('Unexpected value');
    }
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.target.value) {
        updatedTodos({
          id: +new Date(),
          title: event.target.value,
          completed: false,
        });
      }

      setValue('');
    }
  };

  const handleToggleAll = (event: boolean) => {
    const checked = event;

    setTodos(todos.map(todo => ({ ...todo, completed: checked })));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              handleKeyDown(event);
            }}
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
              checked={notCompletedTogglers.length === 0}
              onChange={(event) => handleToggleAll(event.target.checked)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              filteredTodos={filteredTodos}
              setTodos={setTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {notCompletedTogglers.length === 1 ? `${notCompletedTogglers.length} item left` : `${notCompletedTogglers.length} items left`}
            </span>

            <TodoFilter filter={filter} setFilter={setFilter} />

            {completedTogglers.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => clearCompletedTodos()}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
