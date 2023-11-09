import React from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { ToggleAll } from './components/ToggleAll';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Form />

      <section className="main">
        <ToggleAll />
        <ul className="todo-list" data-cy="todoList">
          <TodoList />

        </ul>
      </section>
      <TodoFilter />

    </div>
  );
};
