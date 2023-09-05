/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';

import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';

import { useLocalStorage } from './utils/useLocalStorage';

import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const addNewTodo = async () => {
    if (!inputQuery.trim()) {
      return;
    }

    try {
      setIsLoading(true);

      const newTodo = {
        id: +new Date(),
        title: inputQuery.trim(),
        completed: false,
      };

      const updatedTodos = [...todos, newTodo];

      setTodos(updatedTodos);

      setInputQuery('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewTodo();
  };

  const handleTodoDelete = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case FilterType.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filterBy, todos]);

  const deleteAllCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            onClick={handleToggleAll}
          />
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputQuery}
              onChange={handleInputChange}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
              onDelete={handleTodoDelete}
              setTodos={setTodos}
            />

            <Footer
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              todos={visibleTodos}
              onDelete={deleteAllCompletedTodos}
            />
          </>
        )}
      </div>

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}

    </div>
  );
};
