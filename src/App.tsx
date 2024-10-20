import React, { useEffect, useRef } from 'react';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { useTodoContext } from './components/context/TodoContext';

export const App: React.FC = () => {
  const { state } = useTodoContext();
  const { todos, filter, tempTodo } = state;
  const textField = useRef<HTMLInputElement>(null);

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = () => {
    switch (filter) {
      case Filter.Completed:
        return completedTodos;
      case Filter.Active:
        return activeTodos;
      default:
        return todos;
    }
  };

  useEffect(() => {
    if (textField.current) {
      textField.current.focus();
    }
  }, [todos.length]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header completedTodos={completedTodos} textField={textField} />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos()} />

          {tempTodo && <TodoItem todo={tempTodo} isLoading={true} />}
        </section>

        {todos.length > 0 && (
          <Footer activeTodos={activeTodos} completedTodos={completedTodos} />
        )}
      </div>

      <ErrorNotification />
    </div>
  );
};
