import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Status } from '../../types/FilterStatus';

export const TodoApp: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    toggleAllTodos,
    removeTodo,
    clearCompleted,
    updateTodo,
  } = useContext(TodosContext)!;
  const [newTodo, setNewTodo] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.all);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleFilterChange = (status: Status) => {
    setFilterStatus(status);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const todoField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={todoField}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={!activeTodos.length}
              onChange={toggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`}
            </span>

            <TodosFilter
              status={filterStatus}
              onFilterChange={handleFilterChange}
            />
            {!!completedTodos.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
