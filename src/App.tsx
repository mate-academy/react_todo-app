/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodosContext } from './context/TodosContext';
import { FilteredTodosContext } from './context/FilteredTodosContext';
import { Footer } from './components/Foorer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const context = useContext(TodosContext);
  const filteredContext = useContext(FilteredTodosContext);

  if (!context || !filteredContext) {
    throw new Error('TodoList must be used within a TodosProvider');
  }

  const { todos, setTodos } = context;
  const { filter } = filteredContext;
  const activeTodos = todos.filter(item => !item.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos, filter]);

  function normalizeTodo(value: string): Todo {
    return {
      id: +new Date(),
      title: value,
      completed: false,
    };
  }

  function handleCompleteAll() {
    if (activeTodos.length === 0) {
      const result = todos.map(item => ({
        ...item,
        completed: !item.completed,
      }));

      return setTodos(result);
    }

    const result = todos.map(item => ({
      ...item,
      completed: item.completed === false ? true : true,
    }));

    setTodos(result);
  }

  function clearForm() {
    setInputValue('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    try {
      const readyTodo = normalizeTodo(inputValue.trim());

      setTodos(prevTodos => [...prevTodos, readyTodo]);
      clearForm();
    } catch {
    } finally {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: activeTodos.length === 0,
              })}
              data-cy="ToggleAllButton"
              onClick={() => handleCompleteAll()}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={e => {
                handleInputChange(e);
              }}
              ref={inputRef}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos && <TodoList />}
        </section>

        {todos.length > 0 && <Footer activeTodos={activeTodos} />}
      </div>
    </div>
  );
};
