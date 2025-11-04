import React from 'react';
import { useTodos } from '../context/TodosContext';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import '../styles/TodoApp.scss';

const TodoApp: React.FC = () => {
  const { todos, filter } = useTodos();

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="page">
      <h1 className="title">todos</h1>

      <div className="todo-card">
        <TodoHeader />

        <TodoList todos={visibleTodos} data-cy="TodoList" />

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};

export default TodoApp;
