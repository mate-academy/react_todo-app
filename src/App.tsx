/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Todos } from './components/Todos/Todos';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleToggleTodoStatus = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onAddTodo={addTodo} />

        <Todos todos={todos} onToggleTodoStatus={handleToggleTodoStatus} />

        <Footer />
      </div>
    </div>
  );
};
