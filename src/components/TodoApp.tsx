import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext, TodosProvider } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const
    {
      newTodo,
      handleOnSubmit,
      handleNewTodoChange,
      handleAllCheckedChange,
      allChecked,
    } = useContext(TodosContext);

  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodo.title}
              onChange={handleNewTodoChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allChecked}
            onChange={handleAllCheckedChange}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            3 items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </div>
    </TodosProvider>
  );
};
