/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { TodoType } from './types/TodoType';
import { FilterTypes } from './types/FilterTypes';
import { DispatchContext, StateContext }
  from './components/TodosContext/TodosContext';
import { ActionType } from './types/ActionType';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const reducer = useContext(DispatchContext);

  const state = useContext(StateContext);

  const { filter, todos } = state;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterTypes.active:
        return todos.filter(todo => !todo.completed);

      case FilterTypes.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  const getMaxId = useMemo(() => {
    return (list: TodoType[]): number => {
      if (list.length === 0) {
        return 0;
      }

      return Math.max(...list.map(({ id }) => id));
    };
  }, [todos]);

  const handleKeyPress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() !== '') {
      const newTodo: TodoType = {
        id: getMaxId(todos) + 1,
        name: query,
        completed: false,
      };

      reducer({ type: ActionType.Add, payload: newTodo });
      setQuery('');
    }
  };

  const handleClearBtn = () => {
    reducer({ type: ActionType.ClearCompleted });
  };

  const currentLength = state.todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleKeyPress}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={() => reducer({ type: ActionType.SetCompletedAll })}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

      </section>

      {todos.length > 0 && (
        <Footer
          activeLength={currentLength}
          completedLength={todos.length - currentLength}
          handleClearBtn={handleClearBtn}
        />
      )}
    </div>
  );
};
