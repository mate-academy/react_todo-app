/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoHeader } from './component/TodoHeader';
import { TodoList } from './component/TodoList';
import { TodoFooter } from './component/TodoFooter';

import { useLocalStorage } from './hooks/LocalStorage';

export const App: React.FC = () => {
  const [isInput, setIsInput] = useState('');
  const [todos, setTodos, removeTodo] = useLocalStorage('todos', []);

  const onDelete = (id: number) => {
    removeTodo(id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      id: +new Date(),
      completed: false,
      title: isInput,
    };

    setTodos([...todos, newTodo]);
    setIsInput('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          isInput={isInput}
          setIsInput={setIsInput}
          handleSubmit={handleSubmit}
        />

        <TodoList todos={todos} onDelete={onDelete} />

        {/* Hide the footer if there are no todos */}
        <TodoFooter />
      </div>
    </div>
  );
};
