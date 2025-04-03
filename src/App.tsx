/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoContext } from './contexts/TodoContext';

export const findTodoById = (todos: Todo[], id: number) => {
  return todos.find(todo => todo.id === id);
};

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />
        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
