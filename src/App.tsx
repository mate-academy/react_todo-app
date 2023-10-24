/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState, useContext, useMemo } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosContext } from './stores/TodosContext';
import { FilterBy } from './types/FilterOptions';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { lsTodos, setLsTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const allCompleted = useMemo(() => {
    return lsTodos.every((todo: Todo) => {
      return todo.completed === true;
    });
  }, [lsTodos]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const uncompletedCount = lsTodos.filter((todo: Todo) => {
    return !todo.completed;
  }).length;

  let todos;

  switch (filterBy) {
    default:
    case FilterBy.All:
      todos = lsTodos;
      break;

    case FilterBy.Completed:
      todos = lsTodos.filter((todo: Todo) => {
        return todo.completed === true;
      });
      break;

    case FilterBy.Active:
      todos = lsTodos.filter((todo: Todo) => {
        return todo.completed === false;
      });
      break;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!todoTitle) {
      return;
    }

    const newTodo: Todo = {
      title: todoTitle,
      id: +new Date(),
      completed: false,
    };

    setTodoTitle('');
    setLsTodos((prev: Todo[]) => [newTodo, ...prev]);
  }

  function toggleAll() {
    if (allCompleted) {
      setLsTodos((prev: Todo[]) => {
        return [...prev].map(item => ({
          ...item,
          completed: false,
        }));
      });
    } else {
      setLsTodos((prev: Todo[]) => {
        return [...prev].map(item => ({
          ...item,
          completed: true,
        }));
      });
    }
  }

  function clearAll() {
    setLsTodos((prev: Todo[]) => {
      return [...prev].filter(todo => !todo.completed);
    });
  }

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
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
          />
        </form>
      </header>

      {!!lsTodos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allCompleted}
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={todos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedCount} items left`}
            </span>

            <TodosFilter
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={clearAll}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
