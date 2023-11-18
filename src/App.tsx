/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodosContext } from './contexts/TodosContext';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';
import { Status } from './types/status';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const { list, dispatch } = useContext(TodosContext);
  const [inputValue, setInput] = useState('');
  const [filter, setFilter] = useState(Status.ALL);

  const handlerFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  const filteredList = list.filter(todo => {
    if (filter === Status.ALL) {
      return true;
    }

    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const noCompleteTodos = list.filter(todo => !todo.completed);
  const allCompleted = list.every(todo => todo.completed);
  const isSomeComplete = list.some(todo => todo.completed);

  const todoAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput) {
      const newTodo: Todo = {
        id: +new Date(),
        completed: false,
        title: trimmedInput,
      };

      dispatch({ type: 'add', todo: newTodo });
      setInput('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={todoAddHandler}
          onBlur={todoAddHandler}
        >
          <input
            type="text"
            value={inputValue}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </form>
      </header>
      {list.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allCompleted}
              onChange={() => dispatch({ type: 'completeAll' })}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList list={filteredList} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${noCompleteTodos.length} items left`}
            </span>
            <TodoFilter filter={filter} onFilterChange={handlerFilterChange} />
            {isSomeComplete && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => {
                  dispatch({ type: 'clearAllCompleted' });
                }}
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
