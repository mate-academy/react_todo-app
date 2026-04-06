/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);

  const { todos, addTodo, filter, deleteTodo, clearCompleted } =
    useContext(TodoContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(query);
    setQuery('');
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
    newTodoField.current?.focus();
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === Status.Active) {
      return !todo.completed;
    }

    if (filter === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleClearCompleted = () => {
    clearCompleted();
    newTodoField.current?.focus();
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          inputRef={newTodoField}
        />

        {todos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>
    </div>
  );
};
