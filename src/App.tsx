/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './styles/todoapp.scss';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodos(title: string) {
    const newTodo = {
      id: +new Date(),
      title: title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function toggleTodo(id: number) {
    setTodos(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader addTodos={addTodos} />
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};
