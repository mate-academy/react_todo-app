/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoProvider, useTodo } from './context/TodoContext';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { Footer } from './components/Footer';

// компонент, який зможе користуватися контекстом
const TodoApp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { todos, addTodo, clearCompleted, toggleAll } = useTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const getVisibleTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              /* клас 'active', якщо todos не порожні і кожен todo виконаний */
              className={`todoapp__toggle-all ${
                todos.length > 0 && todos.every(todo => todo.completed)
                  ? 'active'
                  : ''
              }`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <TodoForm addTodo={addTodo} />
        </header>
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </section>
        )}{' '}
        {todos.length > 0 && <Footer filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};

// App огортає все у провайдер
export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
