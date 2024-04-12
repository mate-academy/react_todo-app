import React, { useCallback, useState } from 'react';
import { TodoList } from './TodoList';
import { useTodoContext } from '../context/TodosContext';
import { Filter } from './Filter';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [activeCheckbox, secActiveCheckbox] = useState(false);
  const { orderItems, setOrderItems } = useTodoContext();
  const isNotCompletedTodos = orderItems.filter(item => !item.completed).length;
  const isCompletedTodos = orderItems.filter(item => item.completed).length;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query.trim().length <= 0) {
        return;
      }

      setOrderItems(prevItems => {
        const newItem = {
          id: +new Date(),
          title: query,
          completed: false,
          editing: false,
        };

        return [...prevItems, newItem];
      });

      setQuery('');
    },
    [query, setOrderItems, setQuery],
  );

  const handleActiveAllCheckbox = () => {
    secActiveCheckbox(!activeCheckbox);
    setOrderItems(prevOrderItems =>
      prevOrderItems.map(todo => ({
        ...todo,
        completed: !activeCheckbox,
      })),
    );
  };

  const hendleRemoveAllTodos = () => {
    setOrderItems(prevOrderItems =>
      prevOrderItems.filter(todo => !todo.completed),
    );
  };

  const hasAllCompletedTodos = orderItems.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleQuerySubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={hasAllCompletedTodos}
          data-cy="toggleAll"
          onClick={handleActiveAllCheckbox}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {orderItems.length > 0 && <TodoList />}
      </section>

      {orderItems.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {isNotCompletedTodos} items left
          </span>

          <Filter />

          {isCompletedTodos > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={hendleRemoveAllTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
