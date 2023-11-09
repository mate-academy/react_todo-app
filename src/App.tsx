import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { ToggleAll } from './components/ToggleAll';
import { TodoFilter } from './components/TodoFilter';
import { StateContext } from './components/Store';

export const App: React.FC = () => {
  const state = useContext(StateContext);

  return (
    <div className="todoapp">
      <Form />

      <section className="main">
        {state.length > 0
     && <ToggleAll />}

        <ul className="todo-list" data-cy="todoList">
          <TodoList />

        </ul>
      </section>
      <TodoFilter />

    </div>
  );
};
