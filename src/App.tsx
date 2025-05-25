import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import TodoList from './components/TodoList';
import { DispatchContext, TodosContext } from './app/store';
import TodosFilter from './components/TodoFilter';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import cn from 'classnames';
//import { Header } from './components/Header';

export const App: React.FC = () => {
  const getFilterTodos = (filter: Status, todos: Todo[]) => {
    switch (filter) {
      case Status.active: {
        return [...todos].filter(todo => !todo.completed);
      }

      case Status.completed: {
        return [...todos].filter(todo => todo.completed);
      }

      default:
        return [...todos];
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChangeAll = () => {
    dispatch({ type: 'setToggleAll' });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue.trim()) {
      return;
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'addTodo', payload: inputValue.trim() });
      setInputValue('');
    }
  };

  const handleOnClickDeleteAllCompleted = () => {
    dispatch({ type: 'deleteAllCompleted' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [currentUrl, setCurrentUrl] = useState(window.location.hash);

  useEffect(() => {
    setCurrentUrl(Status.all);
    const handlePathChange = () => {
      setCurrentUrl(window.location.hash);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const filteredTodos = useMemo(
    () => getFilterTodos(currentUrl as Status, todos),
    [currentUrl, todos],
  );

  const activeTodos = useMemo(
    () => getFilterTodos(Status.active, todos),
    [todos],
  );

  const completedTodos = useMemo(
    () => getFilterTodos(Status.completed, todos),
    [todos],
  );
  const allTodoCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              id="toggle-all"
              className={cn('todoapp__toggle-all', {
                active: allTodoCompleted,
              })}
              data-cy="ToggleAllButton"
              disabled={todos.length === 0}
              onClick={handleCheckboxChangeAll}
            />
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              ref={inputRef}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </form>
        </header>
        {/* <Header
          todos={todos}
          inputRef={inputRef}
          allTodoCompleted={allTodoCompleted}
          handleSubmit={handleSubmit}
          handleCheckboxChangeAll={handleCheckboxChangeAll}
          inputValue={inputValue}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          isInputDisabled={false}
          isTodoLoading={false}
          //toggleAllTodos={function (): void {
          //  throw new Error('Function not implemented.');
          //}}
        />*/}
        <TodoList items={filteredTodos} />

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodos.length === 0}
              onClick={handleOnClickDeleteAllCompleted}
            >
              Clear completed
            </button>

            <TodosFilter currentUrl={currentUrl} />
          </footer>
        )}
      </div>
    </div>
  );
};
