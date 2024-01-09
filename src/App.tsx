/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import TodoList from './TodoList';
import { DispatchContext, TodosContext } from './Store';
import TodosFilter from './TodosFilter';
import { Status } from './Status';

export const App: React.FC = () => {
  const state = useContext(TodosContext);
  const { todos } = state;
  const dispatch = useContext(DispatchContext);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChangeAll = () => {
    dispatch({ type: 'setToggleAll' });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue.trim()) {
      return;
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'addTodo', payload: inputValue });
      setInputValue('');
    }
  };

  const handleOnClickDeleteAllCompleted = () => {
    dispatch({ type: 'deleteAllCompleted' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [currentUrl, setCurrentUrl] = useState(window.location.hash);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentUrl(window.location.hash);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const filterTodos = (filter: Status) => {
    switch (filter) {
      case Status.active: {
        return [...todos].filter((todo) => !todo.completed);
      }

      case Status.completed: {
        return [...todos].filter((todo) => todo.completed);
      }

      default:
        return [...todos];
    }
  };

  const filteredTodos = filterTodos(currentUrl as Status);
  const activeTodo = filterTodos(Status.active);
  const completedTodo = filterTodos(Status.completed);

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
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every(item => item.completed)}
          onChange={handleCheckboxChangeAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={filteredTodos} />
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeTodo.length}
            items left
          </span>

          <TodosFilter currentUrl={currentUrl} />

          {completedTodo.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleOnClickDeleteAllCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
