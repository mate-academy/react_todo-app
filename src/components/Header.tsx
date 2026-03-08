import React from 'react';
import { Todo } from '../types/Todo';
import { Action } from './TodoProvider';

type Props = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  completedTodo: Todo[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  changeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  dispatch,
  completedTodo,
  query,
  setQuery,
  inputRef,
  changeInputValue,
}) => {
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      dispatch({
        type: 'ADD',
        payload: trimmedQuery,
      });
      setQuery('');
    }
  };

  const isAllCompleted =
    todos.length > 0 && completedTodo.length === todos.length;

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          value={query}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={changeInputValue}
        />
      </form>
    </header>
  );
};

export default Header;
