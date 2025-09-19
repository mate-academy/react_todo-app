/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useContext(TodosContext);
  const input = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return todo;
    }

    if (filter === 'COMPLETED') {
      return todo.completed;
    }

    if (filter === 'ACTIVE') {
      return !todo.completed;
    }

    return todo;
  });

  const handleClearCompleted = () => {
    setTodos(currentTodos => {
      const newTodos = currentTodos.filter(todo => !todo.completed);

      if (newTodos.length !== currentTodos.length) {
        input.current?.focus();
      }

      return newTodos;
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header input={input} />

        <TodoList filteredTodos={filteredTodos} input={input} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onChangeFilter={value => setFilter(value)}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>
    </div>
  );
};
