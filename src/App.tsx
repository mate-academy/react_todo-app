/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';
import { TodoType } from './types/TodoType';
import classNames from 'classnames';
import { FilteringStatus } from './types/FilteringStatys';
import { useTodos } from './context/TodosContext';
import { focusInput } from './utils/focusInput';

export const App: React.FC = () => {
  const { inputFocus, todos, setTodos } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [filteringStatus, setFilteringStatus] = useState<FilteringStatus>(
    FilteringStatus.All,
  );

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('todos') ?? '[]');

    setTodos(list);
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onSubmit = useCallback(() => {
    if (newTodo.trim() !== '') {
      const createNewTodo: TodoType = {
        id: +new Date(),
        title: newTodo.trim(),
        completed: false,
      };

      const createNewTodoList = [...todos, createNewTodo];

      setTodos(current => [...current, createNewTodo]);

      localStorage.setItem('todos', JSON.stringify(createNewTodoList));
      setNewTodo('');
      focusInput(inputFocus);
    } else {
      setNewTodo('');
    }
  }, [todos, newTodo, setTodos, inputFocus]);

  const clearCompleted = useCallback(() => {
    const newTodos = todos.filter(todo => todo.completed === false);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    focusInput(inputFocus);
  }, [todos, setTodos, inputFocus]);

  const allButton = useCallback(() => {
    if (todos.every(todo => todo.completed === true)) {
      const newTodos = todos.map(todo => ({ ...todo, completed: false }));

      setTodos(newTodos);
      focusInput(inputFocus);
    } else {
      const newTodos = todos.map(todo =>
        todo.completed === false ? { ...todo, completed: true } : todo,
      );

      setTodos(newTodos);
      focusInput(inputFocus);
    }
  }, [todos, setTodos, inputFocus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed === true),
              })}
              data-cy="ToggleAllButton"
              onClick={() => allButton()}
            />
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <input
              data-cy="NewTodoField"
              ref={inputFocus}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <TodoList todoList={todos} filteringStatus={filteringStatus} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => todo.completed === false).length} items left
            </span>

            <Filter setFilteringStatus={setFilteringStatus} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => todo.completed === false)}
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
