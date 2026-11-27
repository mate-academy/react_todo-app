/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { useContext, useEffect, useRef, useState } from 'react';
import ToggleTodos from './Components/ToggleTodos';
import { TabsContext } from './Context/TabsContext';
import Footer from './Components/Footer';
import TodoApp from './Components/TodoApp';

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  const { isEmpty, addTodo } = useContext(TabsContext);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle);
    setTitle('');
  };

  const newTodoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEmpty) {
      newTodoInput.current?.focus();
    }
  }, [isEmpty]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!isEmpty && <ToggleTodos />}

          {/* Add a todo on form submit */}
          <form onSubmit={formHandler}>
            <input
              autoFocus
              ref={newTodoInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
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
