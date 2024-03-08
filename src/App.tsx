/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import TodoList from './components/TodoList/TodoList';
import { TodosContext } from './utils/TodosContext';

export const App: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');

  const { todos, setTodos } = React.useContext(TodosContext);

  const inputField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const hangleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    setTodos([
      {
        id: +new Date(),
        title: inputValue,
        completed: false,
      },
      ...todos,
    ]);
    setInputValue('');
  };

  const handleEnterEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
  };

  const handleBlurEvent = () => {
    if (inputValue.trim()) {
      handleAddTodo();
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            value={inputValue}
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
