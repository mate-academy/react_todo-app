import { useState } from 'react';
import cn from 'classnames';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './components/TodosContext';

import { Filter } from './types/Filter';

export const App = () => {
  const todoActions = useTodos();
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const todos = todoActions.getAll();
  const visibleTodos = todoActions.getAll(filter);
  const activeTodos = todoActions.getAll(Filter.active);
  const hasActiveTodos = activeTodos.length > 0;

  const toggleAll = () => {
    todoActions.toggleAll(hasActiveTodos);
  };

  const clearCompleted = () => {
    todoActions.clearCompleted();
    setFilter(Filter.all);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodoForm addTodo={todoActions.add} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={!hasActiveTodos}
            onChange={toggleAll}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={todoActions.remove}
                onUpdate={todoActions.update}
              />
            ))}
          </ul>
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">{activeTodos.length} items left</span>

          <ul className="filters">
            <li>
              <a
                href={'#' + Filter.all}
                onClick={() => setFilter(Filter.all)}
                className={cn({ selected: filter === Filter.all })}
              >
                All
              </a>
            </li>

            <li>
              <a
                href={'#' + Filter.active}
                onClick={() => setFilter(Filter.active)}
                className={cn({ selected: filter === Filter.active })}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href={'#' + Filter.completed}
                onClick={() => setFilter(Filter.completed)}
                className={cn({ selected: filter === Filter.completed })}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </section>
  );
};
