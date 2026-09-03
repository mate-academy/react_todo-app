/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TodoList } from './Components/TodoList';
import { FilterStatus } from './Types/types';
import { useTodoContext } from './Components/TodoContext';
import { TodoFooter } from './Components/TodoFooter';
import './styles/todoapp.scss';

export const App: React.FC = () => {
  const { todos, filterStatus, addTodos, toggleAllTodos } = useTodoContext();

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const field = useRef<HTMLInputElement>(null);

  const focusField = () => {
    field.current?.focus();
  };

  useEffect(() => {
    focusField();
  }, [todos.length]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filterStatus === FilterStatus.Active) {
        return !todo.completed;
      }

      if (filterStatus === FilterStatus.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterStatus]);

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodos(newTodoTitle);
    setNewTodoTitle('');
    field.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${isAllCompleted ? FilterStatus.Active : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAllTodos}
            />
          )}

          <form onSubmit={handleFormSubmit}>
            <input
              ref={field}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleTaskChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoList todo={todo} key={todo.id} />
          ))}
        </section>

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
