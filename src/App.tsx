/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { useState } from 'react';
import ToggleTodos from './Components/ToggleTodos';
import { useContext } from 'react';
import { TabsContext } from './Context/TabsContext';
import Footer from './Components/Footer';
import TodoApp from './Components/TodoApp';

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  const { isEmpty, addTodo } = useContext(TabsContext);

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    addTodo(title);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!isEmpty && <ToggleTodos />}

          {/* Add a todo on form submit */}
          <form onSubmit={formHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              minLength={6}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        {!isEmpty && <TodoApp />}

        {/* Hide the footer if there are no todos */}
        {!isEmpty && <Footer />}
      </div>
    </div>
  );
};
