import React from 'react';
import { useTodos } from '../context/ TodosContext';
import { TodoItem } from '../components/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter, toggleAll } = useTodos();

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (visibleTodos.length === 0 && todos.length === 0) {
    return null;
  }

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <button
        data-cy="ToggleAllButton"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        onClick={toggleAll}
      >
        {allCompleted ? 'Uncheck all' : 'Check all'}
      </button>

      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
