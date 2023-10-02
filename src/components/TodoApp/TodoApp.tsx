import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../../contexts/TodosContext';
import { TodoFooter } from '../TodoFooter';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const {
    todos,
    addTodo,
    markAllComplete,
    filterTodos,
  } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={markAllComplete}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </section>

          <TodoFooter filter={filter} setFilter={setFilter} />
        </>
      )}
    </div>
  );
};
