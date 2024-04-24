/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/Todo';

export enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [filterType, setFilterType] = useState<Filters>(Filters.All);
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        title: query.trim(),
        completed: false,
      },
    ]);

    setQuery('');

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, title: newTitle.trim(), isEditing: false }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    switch (filterType) {
      case Filters.Active:
        filtered = todos.filter(todo => !todo.completed);
        break;

      case Filters.Completed:
        filtered = todos.filter(todo => todo.completed);
        break;

      default:
        return todos;
    }

    return filtered;
  }, [filterType, todos]);

  const handleFilterChange = (filterT: Filters) => {
    setFilterType(filterT);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const allCompleted = useMemo(
    () => filteredTodos.every(todo => todo.completed),
    [filteredTodos],
  );

  const allActive = useMemo(
    () => filteredTodos.every(todo => !todo.completed),
    [filteredTodos],
  );

  const toggleAll = () => {
    if (allCompleted || allActive) {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      );
    } else {
      {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            !todo.completed ? { ...todo, completed: true } : todo,
          ),
        );
      }
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={addTodo}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>
        </header>

        <TodoList
          todos={filteredTodos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />

        {todos.length > 0 && (
          <Footer
            handleFilterChange={handleFilterChange}
            filterType={filterType}
            activeTodosCount={activeTodosCount}
            todosCount={todos.length}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
};
