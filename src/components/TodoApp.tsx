import React from 'react';
import { useTodos } from './TodoContext';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { TodoFilters } from './TodoFilters';

export const TodoApp: React.FC = () => {
  const { todos, toggleAll, clearCompleted, filter } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <header className="todoapp__header">
            <TodoInput />
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />
          <TodoInput />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
          </span>

          <TodoFilters />

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={clearCompleted}
            disabled={completedTodosCount === 0}
          >
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
};
