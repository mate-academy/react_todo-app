import React, { useState, useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodosSection } from './components/section';
import { TodosFooter } from './components/footer';

export const TodoApp: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { setTodos, todos } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: inputValue,
        title: inputValue,
        completed: false,
      }]);

    setInputValue('');
  };

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
            onChange={event => setInputValue(event.target.value)}
          />
        </form>
      </header>

      <TodosSection />

      {todos.length > 0 && (
        <TodosFooter />
      )}
    </div>
  );
};
