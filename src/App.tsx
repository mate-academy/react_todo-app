/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/TodoList';
import { DispatchContext, StateContext } from './components/TodoContext';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [title, setTodo] = useState('');

  const hasState = !!todos.length;

  const enteredSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      dispatch({
        type: 'Add',
        payload: {
          id: +new Date(),
          title,
          completed: false,
        },
      });
    }

    setTodo('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={enteredSubmit}>
          <input
            value={title}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
      {hasState && (
        <>
          <TodoList />
          <TodosFilter />
        </>
      )}

    </div>
  );
};
