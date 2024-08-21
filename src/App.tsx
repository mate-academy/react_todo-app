import React, { useCallback, useEffect, useRef } from 'react';
import { useGlobalDispatch, useGlobalState } from './context/store';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { handleInputChange, setInputValue } from './helpers/InputHelpers/Input';

import {
  loadTodosFromLocalStorage,
  filterTodos,
  toggleAllTodos,
  deleteCompletedTodos,
} from './services/TodoService';

export const App: React.FC = () => {
  const { todos, inputValue, filterStatus } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const inputElementRef = useRef<HTMLInputElement>(null);

  const filteredTodos = filterTodos(todos, filterStatus);
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const allCompleted = completedTodos.length === todos.length;

  const setTodos = useCallback(
    (value: Todo[]) => {
      dispatch({ type: 'setTodos', payload: value });
    },
    [dispatch],
  );

  const handlePostTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const preparedInputValue = inputValue.trim();

    if (!preparedInputValue.length) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: preparedInputValue,
      completed: false,
    };

    dispatch({ type: 'setTodo', payload: newTodo });
    setInputValue(dispatch, '');
  };

  const handleDeleteAllCompleted = () => {
    const remainingTodos = deleteCompletedTodos(todos);

    setTodos(remainingTodos);
    inputElementRef.current?.focus();
  };

  const handleToggleAll = () => {
    const toggledTodos = toggleAllTodos(todos, allCompleted);

    setTodos(toggledTodos);
    inputElementRef.current?.focus();
  };

  useEffect(() => {
    const todosFromStorage = loadTodosFromLocalStorage();

    setTodos(todosFromStorage);
    inputElementRef.current?.focus();
  }, [setTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              onClick={handleToggleAll}
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}
          <form onSubmit={handlePostTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={e =>
                handleInputChange(e, value => setInputValue(dispatch, value))
              }
              ref={inputElementRef}
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              inputElement={inputElementRef}
            />
          ))}
        </section>
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`}
            </span>
            <TodoFilter />
            <button
              disabled={!completedTodos.length}
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteAllCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
