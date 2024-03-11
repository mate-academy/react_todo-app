/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';

import Footer from './components/Footer/Footer';
import TodoList from './components/TodoList/TodoList';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const { todos, setTodos } = useTodos();

  const inputField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const hangleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: newTodoTitle.trim(),
        completed: false,
      },
    ]);
    setNewTodoTitle('');
  };

  const handleEnterEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
  };

  const handleBlurEvent = () => {
    if (newTodoTitle.trim()) {
      handleAddTodo();
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            value={newTodoTitle}
            ref={inputField}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={hangleInputChange}
            onKeyDown={handleEnterEvent}
            onBlur={handleBlurEvent}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <TodoList />
          <Footer />
        </>
      )}
    </div>
  );
};
